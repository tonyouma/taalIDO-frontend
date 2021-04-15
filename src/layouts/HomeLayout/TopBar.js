import clsx from 'clsx';
import { Icon } from '@iconify/react';
import Logo from 'src/components/Logo';
import React, { useState, useRef, useEffect } from 'react';
import useOffSetTop from 'src/hooks/useOffSetTop';
import homeFill from '@iconify-icons/eva/home-fill';
import PopoverMenu from 'src/components/PopoverMenu';
import roundSpeed from '@iconify-icons/ic/round-speed';
import menu2Fill from '@iconify-icons/eva/menu-2-fill';
import { PATH_APP, PATH_HOME } from 'src/routes/paths';
import bookOpenFill from '@iconify-icons/eva/book-open-fill';
import roundStreetview from '@iconify-icons/ic/round-streetview';
import walletIcon from '@iconify-icons/akar-icons/wallet';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import { makeStyles, alpha } from '@material-ui/core/styles';
import {
  Box,
  List,
  Link,
  Button,
  AppBar,
  Hidden,
  Toolbar,
  MenuItem,
  Container,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import { MIconButton } from 'src/theme';
import WalletDialog from 'src/views/taalswap/Components/WalletDialog';
import { useDispatch, useSelector } from 'react-redux';
import {
  hasError,
  setActivatingConnector,
  setBalance,
  getWalletBalance,
  getContractDecimals
} from 'src/redux/slices/wallet';
import { useEagerConnect, useInactiveListener } from 'src/hooks/useWallet';
import { useWeb3React } from '@web3-react/core';
import { formatEther } from '@ethersproject/units';
import { fixedData } from '../../contracts';
import { tokenData } from '../../contracts';
import Numbers from '../../utils/Numbers';
import { Contract, ContractFactory } from '@ethersproject/contracts';
import moment from 'moment';
import { ethers } from 'ethers';
import { targetNetwork, targetNetworkMsg } from '../../config';
import { useSnackbar } from 'notistack';
import Languages from '../DashboardLayout/TopBar/Languages';
import Settings from 'src/layouts/Common/Settings';
import { fromTalken } from 'src/redux/slices/talken';
import { useTranslation } from 'react-i18next';
// import getEthAddress from 'src/utils/getEthAddress';

// ----------------------------------------------------------------------

const MENU_LINKS = [
  { title: 'Home', icon: homeFill, href: '/' },
  { title: 'IDO', icon: roundStreetview, href: PATH_APP.taalswap.pools },
  { title: 'Vote', icon: roundStreetview, href: PATH_APP.taalswap },
  { title: 'Trade', icon: roundStreetview, href: PATH_APP.taalswap },
  { title: 'Pools', icon: roundStreetview, href: PATH_APP.taalswap },
  {
    title: 'Farms',
    icon: roundStreetview,
    href: PATH_APP.taalswap
  },
  {
    title: 'Docs',
    icon: roundSpeed,
    href: 'https://taalswap.gitbook.io/taalswap-documents/'
  }
  // { title: 'Account', icon: bookOpenFill, href: PATH_APP.taalswap }
];

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 96;

const useStyles = makeStyles((theme) => ({
  root: {},
  toolbar: {
    height: APP_BAR_MOBILE,
    transition: theme.transitions.create(['height', 'background-color'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter
    }),
    [theme.breakpoints.up('md')]: {
      height: APP_BAR_DESKTOP
    }
  },
  isHome: {
    color: theme.palette.common.white
  },
  isDesktopActive: {
    color: theme.palette.primary.main
  },
  isMobileActive: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    )
  },
  onScroll: {
    '& $toolbar': {
      backgroundColor: theme.palette.background.default
    },
    '& $isHome': {
      color: theme.palette.text.primary
    },
    [theme.breakpoints.up('md')]: {
      '& $toolbar': {
        height: APP_BAR_DESKTOP - 20
      }
    }
  }
}));

// ----------------------------------------------------------------------

function TopBar() {
  const classes = useStyles();
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();
  const anchorRef = useRef(null);
  const { pathname } = useLocation();
  const offset = useOffSetTop(100);
  const [openMenu, setOpenMenu] = useState(false);
  const isHome = pathname === '/';
  const { enqueueSnackbar } = useSnackbar();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const { activatingConnector, balance } = useSelector((state) => state.wallet);
  const { os, wallet, from } = useSelector((state) => state.talken);

  const context = useWeb3React();
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error
  } = context;
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();

  useEffect(() => {
    if (os === null && wallet === null && from === null) {
      // const ethAddr = getEthAddress(query.get('wallet'));
      // TODO : talken-wlt 내 실제 주소와 비교
      // console.log('------------->', ethAddr);
      dispatch(
        fromTalken({
          os: query.get('os'),
          // wallet: ethAddr,
          wallet: query.get('wallet'),
          from: query.get('from')
        })
      );
    }
    // console.log('os', os);
    // console.log('wallet', wallet);
    // console.log('from', from);
    if (!!library) {
      if (
        (library.provider.isMetaMask &&
          library.provider.chainId !== targetNetwork) ||
        (!library.provider.isMetaMask &&
          library.provider.chainId !== parseInt(targetNetwork))
      ) {
        enqueueSnackbar(targetNetworkMsg, {
          variant: 'warning',
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
          }
        });
      }
    }
  }, [activatingConnector, connector, library]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();
  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  const handleCloseModal = async (name) => {
    setIsOpenModal(false);
  };

  const renderMenuDesktop = (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
        // border: '1px solid red'
      }}
    >
      {MENU_LINKS.map((link) =>
        link.title !== 'Docs' ? (
          <Link
            exact
            to={link.href}
            key={link.title}
            underline="none"
            variant="subtitle2"
            component={RouterLink}
            activeClassName={classes.isDesktopActive}
            className={clsx({
              [classes.isHome]: isHome
            })}
            sx={{ mr: 5, color: 'text.primary' }}
          >
            {link.title}
          </Link>
        ) : (
          <Link
            to={{ pathname: link.href }}
            target="_blank"
            key={link.title}
            underline="none"
            variant="subtitle2"
            component={RouterLink}
            activeClassName={classes.isDesktopActive}
            className={clsx({
              [classes.isHome]: isHome
            })}
            sx={{ mr: 5, color: 'text.primary' }}
          >
            {link.title}
          </Link>
        )
      )}
      <Box
        sx={{
          // border: '1px solid yellow',
          display: 'flex',
          alignItems: 'center',
          '& > *:not(:first-of-type)': {
            ml: {
              xs: 0.5,
              sm: 2,
              lg: 3
            }
          }
        }}
      >
        <Languages />
        <Settings
          activeClassName={classes.isDesktopActive}
          className={clsx({
            [classes.isHome]: isHome
          })}
          sx={{ mr: 5, color: 'text.primary' }}
          // iconColor="white"
        />
        {/* {!connector && (
          <Button
            underline="none"
            variant="contained"
            // component={Link}
            target="_blank"
            onClick={() => setIsOpenModal(true)}
          >
            Connect Wallet
          </Button>
        )} */}
      </Box>
    </Box>
  );

  const renderMenuMobile = (
    <PopoverMenu
      width={220}
      open={openMenu}
      anchorEl={anchorRef.current}
      onClose={() => setOpenMenu(false)}
    >
      <List>
        {MENU_LINKS.map((link) => (
          <MenuItem
            exact
            to={link.href}
            key={link.title}
            component={RouterLink}
            onClick={() => setOpenMenu(false)}
            activeClassName={classes.isMobileActive}
            sx={{ color: 'text.secondary' }}
          >
            <ListItemIcon>
              <Icon icon={link.icon} width={20} height={20} />
            </ListItemIcon>
            <ListItemText>{link.title}</ListItemText>
          </MenuItem>
        ))}
        {!connector && (
          <Box>
            <MenuItem
              component={Button}
              onClick={() => setIsOpenModal(true)}
              activeClassName={classes.isMobileActive}
              sx={{
                color: 'text.secondary',
                width: '100%'
                // textAlign: 'center'
              }}
            >
              <ListItemIcon>
                <Icon icon={walletIcon} width={20} height={20} />
              </ListItemIcon>
              <ListItemText>{t('taalswap.ConnectWallet')}</ListItemText>
            </MenuItem>
          </Box>
        )}
      </List>
    </PopoverMenu>
  );

  return (
    <AppBar
      color="transparent"
      className={clsx(classes.root, { [classes.onScroll]: offset })}
      sx={{ boxShadow: 'none' }}
    >
      <Toolbar disableGutters className={classes.toolbar}>
        <Container
          maxWidth="lg"
          sx={{
            lineHeight: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
          // style={{ border: '1px solid blue' }}
        >
          <RouterLink to="/">
            <Logo
              className={clsx(classes.root, { [classes.onScroll]: offset })}
            />
          </RouterLink>
          <Box sx={{ flexGrow: 1 }} />

          <Hidden mdDown>{renderMenuDesktop}</Hidden>

          {/* {renderConnectWallet()} */}

          <WalletDialog
            isOpenModal={isOpenModal}
            handleCloseModal={handleCloseModal}
            activate={activate}
          />

          <Hidden mdUp>
            <MIconButton
              ref={anchorRef}
              onClick={() => setOpenMenu(true)}
              className={clsx({
                [classes.isHome]: isHome
              })}
            >
              <Icon icon={menu2Fill} />
            </MIconButton>
            {renderMenuMobile}
          </Hidden>
        </Container>
      </Toolbar>
      {offset && (
        <Box
          sx={{
            left: 0,
            right: 0,
            bottom: 0,
            height: 24,
            zIndex: -1,
            margin: 'auto',
            borderRadius: '50%',
            position: 'absolute',
            width: `calc(100% - 48px)`,
            boxShadow: (theme) => theme.shadows[25].z8
          }}
        />
      )}
    </AppBar>
  );
}

export default TopBar;

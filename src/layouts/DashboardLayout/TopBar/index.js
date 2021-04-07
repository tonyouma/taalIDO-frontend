import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import Search from './Search';
import Account from './Account';
import PropTypes from 'prop-types';
import Languages from './Languages';
import { Icon } from '@iconify/react';
import Notifications from './Notifications';
import Settings from 'src/layouts/Common/Settings';
import menu2Fill from '@iconify-icons/eva/menu-2-fill';
import { alpha, makeStyles } from '@material-ui/core/styles';
import {
  Box,
  AppBar,
  Hidden,
  Toolbar,
  IconButton,
  Button,
  Container
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import {
  getWalletBalance,
  setActivatingConnector,
  setTalBalance
} from '../../../redux/slices/wallet';
import { useEagerConnect, useInactiveListener } from '../../../hooks/useWallet';
import WalletDialog from '../../../views/taalswap/Components/WalletDialog';
import WalletInfo from './WalletInfo';
import { MIconButton } from '../../../theme';
import settings2Fill from '@iconify-icons/eva/settings-2-fill';
import Taalswap from '../../../utils/taalswap';

const TAL_TOKEN_ADDRESS = '0xbC91D155EDBB2ac6079D34F6AfeC40e4E6808DF6';
// import { BorderColor } from '@material-ui/icons';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
    backdropFilter: 'blur(8px)',
    backgroundColor: alpha(theme.palette.background.default, 0.72),
    [theme.breakpoints.up('lg')]: {
      paddingLeft: DRAWER_WIDTH
    }
  },
  toolbar: {
    minHeight: APPBAR_MOBILE,
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(0, 5)
    },
    [theme.breakpoints.up('lg')]: {
      minHeight: APPBAR_DESKTOP
    }
  }
}));

// ----------------------------------------------------------------------

TopBar.propTypes = {
  onOpenNav: PropTypes.func,
  className: PropTypes.string
};

function TopBar({ onOpenNav, className }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { activatingConnector, balance, talBalance } = useSelector(
    (state) => state.wallet
  );

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

  useEffect(async () => {
    // console.log('1----------> ', activatingConnector);
    // console.log('1----------> ', connector);
    if (activatingConnector && activatingConnector === connector) {
      dispatch(setActivatingConnector(undefined));
    }

    if (!!library && !!account) {
      dispatch(getWalletBalance(account, library));
      // dispatch(getContractDecimals(account, library));

      const taalswap = new Taalswap({
        account,
        library,
        tokenAddress: TAL_TOKEN_ADDRESS
      });

      const talBalance = await taalswap.balanceOf(account);
      dispatch(setTalBalance(talBalance));
    }
  }, [activatingConnector, connector, account, library]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();
  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);
  const handleCloseModal = async (name) => {
    setIsOpenModal(false);
  };
  const renderConnectWallet = () => {
    if (!connector) {
      return (
        <Box p={0.8}>
          <Button
            underline="none"
            variant="contained"
            // component={Link}
            target="_blank"
            onClick={() => setIsOpenModal(true)}
          >
            Connect Wallet
          </Button>
        </Box>
      );
    }
  };
  return (
    <AppBar className={clsx(classes.root, className)}>
      <Toolbar className={classes.toolbar}>
        <Hidden lgUp>
          <IconButton
            onClick={onOpenNav}
            sx={{
              mr: 1,
              color: 'text.primary'
            }}
          >
            <Icon icon={menu2Fill} />
          </IconButton>
        </Hidden>

        {/* <Search /> */}
        <Box sx={{ flexGrow: 1 }} />

        <Box
          sx={{
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
          {connector && (
            <WalletInfo
              walletAddress={account}
              balance={balance}
              talBalance={talBalance}
            />
          )}
          <Languages />
          {/* <Notifications /> */}
          <Settings />
          {/* <Account /> */}
          {renderConnectWallet()}
          <WalletDialog
            isOpenModal={isOpenModal}
            handleCloseModal={handleCloseModal}
            activate={activate}
          />
        </Box>
      </Toolbar>
      <Box border={1} borderColor={'#e5e8eb'}></Box>
    </AppBar>
  );
}

export default TopBar;

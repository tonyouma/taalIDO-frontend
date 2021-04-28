import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Languages from './Languages';
import { Icon } from '@iconify/react';
import Settings from 'src/layouts/Common/Settings';
import menu2Fill from '@iconify-icons/eva/menu-2-fill';
import { alpha, makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Divider,
  AppBar,
  Hidden,
  Toolbar,
  IconButton,
  Button
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import {
  getWalletBalance,
  setActivatingConnector,
  setBalance
} from '../../../redux/slices/wallet';
import { useEagerConnect, useInactiveListener } from '../../../hooks/useWallet';
import WalletDialog from '../../../views/taalswap/Components/WalletDialog';
import WalletInfo from './WalletInfo';
import Taalswap from 'src/utils/taalswap';
import { useSnackbar } from 'notistack';
import { targetNetwork, targetNetworkMsg } from 'src/config';
import { useTranslation } from 'react-i18next';

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
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  // const { login, logout } = useAuth();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { activatingConnector, balance, talBalance } = useSelector(
    (state) => state.wallet
  );
  const { os, wallet, from } = useSelector((state) => state.talken);

  const context = useWeb3React();
  const { connector, library, account, activate } = context;

  useEffect(() => {
    async function login() {
      // console.log('1----------> ', activatingConnector);
      // console.log('1----------> ', connector);
      // console.log('1----------> ', active);
      // console.log('1----------> ', activate);
      // console.log('os', os);
      // console.log('wallet', wallet);
      // console.log('from', from);
      if (activatingConnector && activatingConnector === connector) {
        dispatch(setActivatingConnector(undefined));
      }

      if (!!library && !!account) {
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
        } else {
          dispatch(getWalletBalance(account, library));

          // dispatch(getContractDecimals(account, library));

          // tal 표시 이상해서 제거
          // const taalswap = new Taalswap({
          //   account,
          //   library,
          //   tokenAddress: TAL_TOKEN_ADDRESS
          // });
          //
          // const talBalance = await taalswap
          //   .balanceOf(account)
          //   .catch((error) => console.log(error));
          // dispatch(setTalBalance(talBalance));
        }
      } else if (from !== null) {
        const taalswap = new Taalswap({ notConnected: true });
        try {
          const walletBalance = await taalswap.getBalance(wallet);
          console.log('balance', walletBalance);
          dispatch(setBalance(walletBalance));
        } catch (e) {
          console.log(e);
        }
      } else if (window.klayton) {
        console.log('test=====', window.klayton);
      }
    }
    login();
  }, [activatingConnector, connector, account, library]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();
  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);
  const handleCloseModal = async (name) => {
    setIsOpenModal(false);
  };
  const renderConnectWallet = () => {
    if (!library && from === null) {
      return (
        <Box p={0.8}>
          <Button
            underline="none"
            variant="contained"
            target="_blank"
            onClick={() => setIsOpenModal(true)}
          >
            {t('taalswap.ConnectWallet')}
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
          {!!library && (
            <WalletInfo
              walletAddress={account}
              balance={balance}
              talBalance={talBalance}
              disconnect={true}
            />
          )}
          {!!from && (
            <WalletInfo
              walletAddress={wallet}
              balance={balance}
              talBalance={talBalance}
              disconnect={false}
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
      <Divider />
    </AppBar>
  );
}

export default TopBar;

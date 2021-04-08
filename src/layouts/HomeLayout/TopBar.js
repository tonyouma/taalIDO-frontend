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

// ----------------------------------------------------------------------

const MENU_LINKS = [
  { title: 'Home', icon: homeFill, href: '/' },
  { title: 'IDO', icon: roundStreetview, href: PATH_APP.taalswap.pools },
  { title: 'Pools', icon: roundStreetview, href: PATH_APP.taalswap },
  {
    title: 'Yield Farming',
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
  const dispatch = useDispatch();
  const anchorRef = useRef(null);
  const { pathname } = useLocation();
  const offset = useOffSetTop(100);
  const [openMenu, setOpenMenu] = useState(false);
  const isHome = pathname === '/';
  const { enqueueSnackbar } = useSnackbar();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const { activatingConnector, balance } = useSelector((state) => state.wallet);

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

  useEffect(() => {
    if (!!library && library.provider.chainId !== targetNetwork) {
      enqueueSnackbar(targetNetworkMsg, {
        variant: 'warning',
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center'
        }
      });
    }
  }, [activatingConnector, connector, library]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();
  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  const handleCloseModal = async (name) => {
    setIsOpenModal(false);
  };

  // dispatch(getContractDecimals(account, library));

  // 스마트컨트랙 연동 테스트 코그 >>
  if (!!library) {
    // console.log('library', library);
    // const ERC20TokenAddress = '0x581F2FCA16F9989CA9c46ebbD107410c9D8fA0B8';
    // const contractAddress = '0xd9606583D4e2c9b7d9EB89C0C3De1d359d9DDb5F';
    // const ERC20TokenAddress = '0x581F2FCA16F9989CA9c46ebbD107410c9D8fA0B8';
    // const contractAddress = '0xB4c8796C9A5230D0320A6c32FD7125b0519E486a';
    // const fixedContract = new Contract(
    //   contractAddress,
    //   ContractFactory.getInterface(fixedData.abi),
    //   library.getSigner(account).connectUnchecked()
    // );
    // const tokenContract = new Contract(
    //   contractAddress,
    //   ContractFactory.getInterface(tokenData.abi),
    //   library.getSigner(account).connectUnchecked()
    // );
    // const taalswapApp = new Application({
    //   test: true,
    //   mainnet: false,
    //   account: account
    // });
    // const swapContract = taalswapApp.getFixedSwapContract({tokenAddress : ERC20TokenAddress, decimals : 18});
    // const swapContract = taalswapApp.getFixedSwapContract({
    //   tokenAddress: ERC20TokenAddress,
    //   decimals: 18,
    //   contractAddress: contractAddress,
    //   fixedContract: fixedContract,
    //   tokenContract: tokenContract
    // });
    // const params = [
    //   ERC20TokenAddress,
    //   Numbers.toSmartContractDecimals(tradeValue, 18) /* to wei */,
    //   Numbers.toSmartContractDecimals(tokenFundAmount, 18),
    //   Numbers.timeToSmartContractTime(moment().add(6, 'minutes')),
    //   Numbers.timeToSmartContractTime(moment().add(8, 'minutes')),
    //   Numbers.toSmartContractDecimals(0, 18),
    //   Numbers.toSmartContractDecimals(tokenFundAmount, 18),
    //   false,
    //   Numbers.toSmartContractDecimals(0, 18),
    //   parseInt('2'),
    //   true
    // ];
    //
    // console.log(params);
    // 스마트컨트랙 배포 샘플 코드
    // const factory = new ContractFactory(
    //   fixedData.abi,
    //   fixedData.bytecode,
    //   library.getSigner(account)
    // );
    //
    // taalDeploy(factory).then((r) => console.log('..... Deploy DONE'));
    // ethers.Contract;
    // const deployTx = ethers.Contract.getDeployTransaction(
    //   fixedData.bytecode,
    //   fixedData.abi,
    //   params
    // );
    // library.contract.deployTransaction();
    // ContractFactory.getInterface();
    //
    // library
    //   .getSigner(account)
    //   .connectUnchecked()
    //   .sendTransaction(deployTx)
    //   .then((tx) => {
    //     console.log(tx);
    //   });
    // library.wallet.sendTransaction(deployTx).then((tx) => {
    //   console.log(tx);
    // });
    // swapContract
    //   .deploy({
    //     tradeValue: tradeValue,
    //     tokensForSale: tokenFundAmount,
    //     isTokenSwapAtomic: true,
    //     individualMaximumAmount: tokenFundAmount,
    //     startDate: moment().add(6, 'minutes'),
    //     endDate: moment().add(8, 'minutes'),
    //     hasWhitelisting: true
    //   })
    //   .then((resp) => {
    //     console.log(swapContract.getAddress());
    //   });
    // swapContract.__init__();
    // swapContract.assertERC20Info().then((resp) => {
    //   console.log(resp);
    // });
    // console.log(swapContract);
    // swapContract.tokensForSale().then((tokens) => {
    //   console.log('tokensForSale', tokens);
    //   const xxx = Numbers.toSmartContractDecimals(tokens, 18);
    //   console.log(xxx);
    // });
    // swapContract.tokensAllocated().then((tokens) => {
    //   console.log('tokensAllocated', tokens);
    //   const xxx = Numbers.toSmartContractDecimals(tokens, 18);
    //   console.log('tokensAllocated' + xxx);
    // });
    //
    // swapContract.getBuyers().then((buyers) => {
    //   console.log('getBuyers', buyers);
    //   // const xxx = Numbers.toSmartContractDecimals(buyers, 18);
    //   // console.log('getBuyers' + xxx);
    // });
    //
    // swapContract.isOpen().then((isOpen) => {
    //   console.log('isOpen', isOpen);
    // const xxx = Numbers.toSmartContractDecimals(buyers, 18);
    // console.log('getBuyers' + xxx);
    // });
    //
    // swapContract.isPreStart().then((isPreStart) => {
    //   console.log('isPreStart', isPreStart);
    //   // const xxx = Numbers.toSmartContractDecimals(buyers, 18);
    //   // console.log('getBuyers' + xxx);
    // });
    //
    // swapContract.isFunded().then((isSaleFunded) => {
    //   console.log('isSaleFunded', isSaleFunded);
    //   // const xxx = Numbers.toSmartContractDecimals(buyers, 18);
    //   // console.log('getBuyers' + xxx);
    // });
    //
    // // const tokenPurchaseAmount = 0.000000000002145546; 잘못된 값
    // const tokenPurchaseAmount = 10000;
    // swapContract
    //   .swap({ tokenAmount: tokenPurchaseAmount, account: account })
    //   .then((resp) => {
    //     console.log(resp);
    //   });
    // }
    // << 스마트컨트랙 연동 테스트 소스
    // console.log('2----------> ', activatingConnector);
    // console.log('2----------> ', connector);
    // if (balance !== null) {
    //   console.log('wallet account = ', account);
    //   console.log('wallet balance = ', formatEther(balance));
  }
  const renderMenuDesktop = (
    <div>
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
      {!connector && (
        <Button
          underline="none"
          variant="contained"
          // component={Link}
          target="_blank"
          onClick={() => setIsOpenModal(true)}
        >
          Connect Wallet
        </Button>
      )}
    </div>
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
              <ListItemText>Connect Wallet</ListItemText>
            </MenuItem>
          </Box>
        )}
      </List>
    </PopoverMenu>
  );

  // const renderConnectWallet = () => {
  //   if (!connector) {
  //     return (
  //       <Button
  //         underline="none"
  //         variant="contained"
  //         // component={Link}
  //         target="_blank"
  //         onClick={() => setIsOpenModal(true)}
  //       >
  //         Connect Wallet
  //       </Button>
  //     );
  //   }
  // };

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

async function taalDeploy(factory) {
  const ERC20TokenAddress = '0x581F2FCA16F9989CA9c46ebbD107410c9D8fA0B8';
  const tokenFundAmount = 0.00000000000345546;
  const tradeValue = 0.0000000000012342;

  const contract = await factory.deploy(
    ERC20TokenAddress,
    Numbers.toSmartContractDecimals(tradeValue, 18) /* to wei */,
    Numbers.toSmartContractDecimals(tokenFundAmount, 18),
    Numbers.timeToSmartContractTime(moment().add(6, 'minutes')),
    Numbers.timeToSmartContractTime(moment().add(8, 'minutes')),
    Numbers.toSmartContractDecimals(0, 18),
    Numbers.toSmartContractDecimals(tokenFundAmount, 18),
    false,
    Numbers.toSmartContractDecimals(0, 18),
    parseInt('10'),
    true,
    {
      gasLimit: 7000000
    }
  );

  console.log(contract);
  console.log('$$$$$$$$$$$$$$$$$$$$$$$');
  const receipt = await contract.deployTransaction.wait();

  // Async로 동작을 함...
  console.log('######################');
  console.log(receipt);

  const { confirmations } = receipt;
  if (confirmations === 1) {
    console.log('fixedSwap contract deploy... confirmed!!');
  }

  const { address } = contract;
  console.log(address);
}

export default TopBar;

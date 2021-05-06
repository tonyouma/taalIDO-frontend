import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography
} from '@material-ui/core';

import { injected, walletconnect } from 'src/connectors';
import { setActivatingConnector } from 'src/redux/slices/wallet';
import { useDispatch } from 'react-redux';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import './APP.css';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {},
  button: {
    width: '100px'
  },
  dialogTitle: {
    textAlign: 'center',
    fontSize: 20,
    // color: '#000000',
    paddingTop: 10
  },
  // page 4-1 디자인 변경 : border 테두리,
  walletBoxWrapper: {
    padding: '0rem 1rem 0rem 1rem',
    borderRadius: '1em',
    border: '1px solid',
    borderColor: theme.palette.primary.main,
    marginBottom: '1rem',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  // 4-1 디자인 변경 connect to wall,
  walletBoxIcon: {
    alignItems: 'center'
  },
  walletBoxContent: {
    margin: '0.5rem',
    minWidth: 135,
    padding: '0rem 0.5rem 0rem 0.5rem'
  }
}));

const walletList = [
  {
    name: 'Talken',
    name2: 'All'
  },
  {
    name: 'MetaMask',
    name2: 'ETH, BSC, HECO'
  },
  {
    name: 'WalletConnect',
    name2: 'ETH'
  },
  {
    name: 'Binance Wallet',
    name2: 'BSC'
  },
  {
    name: 'Kaikas',
    name2: 'Klaytn'
  },
  {
    name: "d'Cent",
    name2: 'Klaytn'
  }
];

const WalletDialog = ({ isOpenModal, handleCloseModal, activate }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onClickWallet = async (wallet) => {
    try {
      if (wallet.name === 'MetaMask') {
        await activate(injected, null, true);
        dispatch(setActivatingConnector(injected));
        window.localStorage.setItem('chainId', 'injected');
      } else if (wallet.name === 'WalletConnect') {
        const wc = walletconnect(true);
        await activate(wc, undefined, true);
        window.localStorage.setItem('chainId', 'walletconnect');
      }
      // console.log('end', wallet);
    } catch (e) {
      console.log('connect wallet error', e);
    }

    handleCloseModal(wallet.name);
  };

  return (
    <React.Fragment>
      <Dialog
        maxWidth="xs"
        fullWidth
        open={isOpenModal}
        onClose={handleCloseModal}
        aria-labelledby="max-width-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box className={classes.dialogTitle} id="dialog_title">
          {t('taalswap.ConnectToWallet')}
        </Box>
        <DialogTitle
          className={classes.dialogTitle}
          id="customized-dialog-title"
          onClose={handleCloseModal}
        />
        <DialogContent>
          {walletList.map((wallet, index) => (
            <fieldset
              key={index}
              className={classes.walletBoxWrapper}
              onClick={index !== 2 ? () => onClickWallet(wallet) : undefined}
              id="list_box"
            >
              <legend>{wallet.name2}</legend>
              <Box
                component="img"
                alt="logo"
                src={'/static/icons/wallet_icon0' + (index + 1) + '.png'}
                height={index == 1 ? 30 : 40}
                className={classes.walletBoxIcon}
                id="logo_icon"
              />
              <Box className={classes.walletBoxContent}>
                <Typography>{wallet.name}</Typography>
              </Box>
              <Box
                component="img"
                alt="arrow"
                src={'/static/icons/Path.png'}
                className="arrow_icon"
              />
            </fieldset>
          ))}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default WalletDialog;

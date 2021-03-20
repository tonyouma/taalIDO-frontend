import React, { useEffect } from 'react';
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

const useStyles = makeStyles((theme) => ({
  root: {},
  button: {
    width: '100px'
  },
  dialogTitle: {
    textAlign: 'center',
    color: theme.palette.primary.main
  },
  walletBoxWrapper: {
    padding: '0rem 1rem 0rem 1rem',
    borderRadius: '1em',
    border: '1px solid gray',
    marginBottom: '1rem',
    textAlign: 'center',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  walletBoxContent: {
    margin: '0.5rem',
    padding: '0rem 0.5rem 0rem 0.5rem'
  }
}));

const walletList = [
  {
    name: 'MetaMask'
  },
  {
    name: 'WalletConnect'
  },
  {
    name: 'Binance Wallet'
  }
];

const WalletDialog = ({ isOpenModal, handleCloseModal, activate }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onClickWallet = async (wallet) => {
    if (wallet.name === 'MetaMask') {
      await activate(injected);
      dispatch(setActivatingConnector(injected));
    } else if (wallet.name === 'WalletConnect') {
      await activate(walletconnect);
      dispatch(setActivatingConnector(walletconnect));
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
        <DialogTitle
          className={classes.dialogTitle}
          id="customized-dialog-title"
          onClose={handleCloseModal}
        >
          CONNECT TO A WALLET
        </DialogTitle>
        <DialogContent>
          {walletList.map((wallet, index) => (
            <Box
              key={index}
              className={classes.walletBoxWrapper}
              boxShadow="3"
              onClick={() => onClickWallet(wallet)}
            >
              <Box className={classes.walletBoxContent}>
                <Typography>{wallet.name}</Typography>
              </Box>
            </Box>
          ))}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default WalletDialog;

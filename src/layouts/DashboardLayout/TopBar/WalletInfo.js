import React, { useState, useEffect, useRef, useReducer } from 'react';
import {
  Card,
  Button,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  IconButton,
  Icon,
  Typography,
  Chip
} from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import EllipsisText from 'react-text-overflow-middle-ellipsis';
import { formatEther } from '@ethersproject/units';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { useSnackbar } from 'notistack';
import { useWeb3React } from '@web3-react/core';

const useStyles = makeStyles((theme) => ({
  root: {
    // width: '400px',
    height: '40px',
    margin: 1,
    padding: theme.spacing(1),
    color: theme.palette.text.primary,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    fontSize: 13
    // border: '1px solid red'
  },
  icon: {
    width: '10%',
    marginLeft: '5px',
    '&:hover': {
      cursor: 'pointer',
      opacity: 0.72
    }
  }
}));

const WalletInfo = ({ walletAddress, balance, talBalance, disconnect }) => {
  const classes = useStyles();
  const addressRef = useRef();
  const { enqueueSnackbar } = useSnackbar();
  const context = useWeb3React();
  const { deactivate } = context;

  const onClickCopy = () => {
    try {
      // navigator.clipboard.writeText(walletAddress);
      if (navigator.clipboard && window.isSecureContext && false) {
        navigator.clipboard.writeText(walletAddress);
      } else {
        let textArea = document.createElement('textarea');
        textArea.value = walletAddress;
        // make the textarea out of viewport
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        new Promise((res, rej) => {
          // here the magic happens
          document.execCommand('copy') ? res() : rej();
          textArea.remove();
        });
      }
      enqueueSnackbar('copied!!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('failed!!', { variant: 'error' });
    }
  };

  const ethStr =
    balance !== null ? parseFloat(formatEther(balance)).toFixed(2) : '0';
  const talStr = talBalance !== null ? parseFloat(talBalance).toFixed(2) : '0';
  const n = walletAddress.length;
  const walletStr =
    walletAddress.substr(0, 5) + '...' + walletAddress.substr(n - 5, n);
  return (
    <Box className={classes.root}>
      <Chip className={classes.chip} label={`${ethStr} ETH`} />
      {/* <Chip className={classes.chip} label={`${talStr} TAL`} /> */}
      <Chip className={classes.chip} label={walletStr} />
      <Box className={classes.icon}>
        <FileCopyIcon fontSize="small" onClick={onClickCopy} />
      </Box>
      {disconnect ? (
        <Box p={0.8}>
          <Button
            underline="none"
            variant="contained"
            onClick={async () => await deactivate()}
          >
            Logout
          </Button>
        </Box>
      ) : null}
    </Box>
  );
};

export default WalletInfo;

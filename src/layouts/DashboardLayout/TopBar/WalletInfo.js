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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '400px',
    height: '40px',
    margin: 1,
    padding: theme.spacing(1),
    color: theme.palette.text.primary,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    fontSize: 13
  },
  icon: {
    width: '10%',
    '&:hover': {
      cursor: 'pointer',
      opacity: 0.72
    }
  }
}));

const WalletInfo = ({ walletAddress, balance, talBalance }) => {
  const classes = useStyles();
  const addressRef = useRef();
  const { enqueueSnackbar } = useSnackbar();

  const onClickCopy = () => {
    try {
      navigator.clipboard.writeText(walletAddress);
      enqueueSnackbar('copied!!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('failed!!', { variant: 'error' });
      console.log(error);
    }
  };

  console.log(balance);
  console.log(talBalance);
  const ethStr =
    balance !== null ? parseFloat(formatEther(balance)).toFixed(2) : '0';
  const talStr = talBalance !== null ? parseFloat(talBalance).toFixed(2) : '0';
  const n = walletAddress.length;
  const walletStr =
    walletAddress.substr(0, 5) + '...' + walletAddress.substr(n - 5, n);
  return (
    <Box className={classes.root}>
      <Chip className={classes.chip} label={`${ethStr} ETH`} />
      <Chip className={classes.chip} label={`${talStr} TAL`} />
      <Chip className={classes.chip} label={walletStr} />
      <Box className={classes.icon}>
        <FileCopyIcon fontSize="small" onClick={onClickCopy} />
      </Box>
    </Box>
  );
};

export default WalletInfo;

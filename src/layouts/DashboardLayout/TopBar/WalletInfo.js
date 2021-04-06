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
  Icon
} from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import EllipsisText from 'react-text-overflow-middle-ellipsis';
import { formatEther } from '@ethersproject/units';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '270px',
    height: '40px',
    padding: theme.spacing(1),
    border: '1px solid',
    borderColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
    borderRadius: '15px',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 13
  },
  balance: {
    width: '50%',
    height: '30px',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    fontWeight: 'fontWeightBold'
    // padding: theme.spacing(1)
  },
  address: {
    width: '50%',
    display: 'flex',
    margin: 1,
    justifyContent: 'flex-start',
    padding: theme.spacing(1),
    fontWeight: 'fontWeightBold'
  },

  icon: {
    width: '10%',
    '&:hover': {
      cursor: 'pointer',
      opacity: 0.72
    }
  }
}));

const WalletInfo = ({ walletAddress, balance }) => {
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

  return (
    <Box className={classes.root}>
      <Box className={classes.balance}>
        {balance !== null ? parseFloat(formatEther(balance)).toFixed(2) : '0'}{' '}
        ETH
      </Box>
      <Box className={classes.address}>
        <EllipsisText text={walletAddress} ref={addressRef} />
      </Box>
      <Box className={classes.icon}>
        <FileCopyIcon fontSize="small" onClick={onClickCopy} />
      </Box>
    </Box>
  );
};

export default WalletInfo;

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
  Typography
} from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import EllipsisText from 'react-text-overflow-middle-ellipsis';
import { formatEther } from '@ethersproject/units';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '500px',
    height: '40px',
    margin: 1,
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
  balance1: {
    width: '40%',
    height: '30px',
    margin: 1,
    backgroundColor: theme.palette.primary.light,
    color: 'block',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  balance2: {
    width: '40%',
    height: '30px',
    margin: 1,
    backgroundColor: theme.palette.primary.light,
    color: 'black',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  address: {
    width: '20%',
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
  return (
    <Box className={classes.root}>
      <Box className={classes.balance1}>
        <Typography variant="overline">
          {balance !== null ? parseFloat(formatEther(balance)).toFixed(2) : '0'}{' '}
          ETH
        </Typography>
      </Box>
      <Box className={classes.balance2}>
        <Typography variant="overline">
          {talBalance !== null ? parseFloat(talBalance).toFixed(2) : '0'} TAL
        </Typography>
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

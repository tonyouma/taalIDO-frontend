import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import shieldFill from '@iconify-icons/eva/shield-fill';

import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Divider, Typography, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { Contract, ContractFactory } from '@ethersproject/contracts';
import { fixedData } from '../../../contracts';
import { tokenData } from '../../../contracts';
import { useWeb3React } from '@web3-react/core';
import Application from 'taalswap-js/src/models';
import moment from 'moment';
import {
  getWalletBalance,
  setActivatingConnector
} from '../../../redux/slices/wallet';
import { formatEther } from '@ethersproject/units';
import { getPoolStatus } from '../../../utils/getPoolStatus';
// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      height: 'calc(100% - 16px)',
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(5),
      borderRadius: theme.shape.borderRadiusMd,
      backgroundColor:
        theme.palette.grey[theme.palette.mode === 'light' ? 200 : 700]
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5)
    }
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2.5),
    marginTop: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

JoninthePool.propTypes = {
  className: PropTypes.string
};

function JoninthePool({ className, pool }) {
  const classes = useStyles();
  const context = useWeb3React();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isSaleFunded, setIsSaleFunded] = useState(false);
  const [tokensLeft, setTokensLeft] = useState(0);
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [warningMessage, setWarningMessage] = useState('');
  const [diffTime, setDiffTime] = useState({});
  const { activatingConnector, balance } = useSelector((state) => state.wallet);
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
  let swapContract;

  if (
    !!library &&
    (pool.contractAddress !== '') & (pool.tokenContractAddr !== '')
  ) {
    const fixedContract = new Contract(
      pool.contractAddress,
      ContractFactory.getInterface(fixedData.abi),
      library.getSigner(account).connectUnchecked()
    );

    const tokenContract = new Contract(
      pool.tokenContractAddr,
      ContractFactory.getInterface(tokenData.abi),
      library.getSigner(account).connectUnchecked()
    );
    const taalswapApp = new Application({
      test: true,
      mainnet: false,
      account: account
    });

    swapContract = taalswapApp.getFixedSwapContract({
      tokenAddress: pool.tokenContractAddr,
      decimals: 18,
      contractAddress: pool.contractAddress,
      fixedContract: fixedContract,
      tokenContract: tokenContract
    });
  }

  const onChangeAmount = (e) => {
    setAmount(e.target.value);
    setPrice(e.target.value * pool.tradeValue);
    console.log(e.target.value * pool.tradeValue);
    console.log(pool.tradeValue);
  };

  const onClickSwap = () => {
    try {
      if (!!library) {
        getPoolStatus(swapContract);
        console.log(`minAmount  : ${minAmount}`);

        console.log(`maxAmount  : ${maxAmount}`);
        console.log(
          `balance    : ${parseFloat(formatEther(balance)).toFixed(4)}`
        );

        if (
          parseFloat(minAmount) < parseFloat(amount) &&
          parseFloat(amount) < parseFloat(maxAmount)
        ) {
          console.log(`amount     : ${amount}`);
          console.log(`tokensLeft : ${tokensLeft}`);

          if (parseFloat(amount) < parseFloat(tokensLeft)) {
            swapContract
              .swap({ tokenAmount: amount, account: account })
              .then((resp) => {
                console.log(resp);
                setAmount(0);
              })
              .catch((error) => console.log(error));
          } else {
            console.log('2차 실패');
            setWarningMessage('tokensLeft보다 작게');
          }
        } else {
          setWarningMessage('최대값 보다 작고 최소값 보다 크게');
          console.log('1차 실패');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const setDate = () => {
  //   var nowEpoch = moment();
  //   const endDate = moment.unix(pool.endDate);

  //   console.log(nowEpoch.format('YYYY-MM-DD HH:mm'));
  //   console.log(endDate.format('YYYY-MM-DD HH:mm'));

  //   setDiffTime({
  //     day: moment.duration(endDate.diff(nowEpoch)).days(),
  //     hour: moment.duration(endDate.diff(nowEpoch)).hours(),
  //     minute: moment.duration(endDate.diff(nowEpoch)).minutes()
  //     // second: moment.duration(endDate.diff(nowEpoch)).seconds()
  //   });

  //   console.log(
  //     `${diffTime.day} 일 ${diffTime.hour} 시간 ${diffTime.minute} 분 `
  //   );
  // };

  useEffect(async () => {
    if (!!library && !!swapContract) {
      await swapContract
        .isOpen()
        .then((result) => {
          setIsOpen(result);
        })
        .catch((error) => {});

      await swapContract
        .isFunded()
        .then((result) => {
          setIsSaleFunded(result);
        })
        .catch((error) => {});

      await swapContract
        .tokensLeft()
        .then((result) => {
          setTokensLeft(result);
        })
        .catch((error) => {});

      await swapContract
        .individualMinimumAmount()
        .then((result) => {
          setMinAmount(result);
        })
        .catch((error) => {});

      await swapContract
        .individualMaximumAmount()
        .then((result) => {
          setMaxAmount(result);
        })
        .catch((error) => {});
    }
    console.log(`isOpen : ${isOpen}, isSaleFunded : ${isSaleFunded}`);
  }, [pool]);

  useEffect(async () => {
    if (!!library && !!balance) {
      await dispatch(getWalletBalance(account, library));
    }
  }, [activatingConnector, connector]);

  return (
    <div className={clsx(classes.root, className)}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        Join the Pool
      </Typography>

      <div className={classes.row}>
        <Typography
          variant="subtitle2"
          component="p"
          sx={{ color: 'text.secondary' }}
        >
          0d : 5h : 22m : 51s
        </Typography>
      </div>

      <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />

      <div className={classes.row}>
        <Typography
          component="p"
          variant="subtitle2"
          sx={{ color: 'text.secondary' }}
        >
          Yout Bid Ammount
        </Typography>
        <Typography
          component="p"
          variant="body2"
          sx={{ color: 'text.secondary' }}
        >
          Blance : {balance !== null ? formatEther(balance) : '0'} ETH
        </Typography>
      </div>

      <Box sx={{ mb: 1.5, display: 'flex', justifyContent: 'flex-end' }}>
        <Typography
          component="span"
          variant="subtitle2"
          sx={{
            mb: 1,
            alignSelf: 'flex-end',
            color: 'text.secondary'
          }}
        >
          Price : {price} ETH
        </Typography>
      </Box>

      <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />

      <div className={classes.row}>
        <Typography
          component="p"
          variant="subtitle2"
          sx={{ color: 'text.secondary' }}
        >
          Ammount
        </Typography>
      </div>

      <Box sx={{ mb: 2.5, display: 'flex', justifyContent: 'flex-end' }}>
        <Typography variant="h2" sx={{ mx: 1 }}>
          <TextField
            type="number"
            sx={{
              flex: 2 / 5,
              flexWrap: 'wrap'
            }}
            variant="standard"
            InputLabelProps={{
              shrink: true
            }}
            size="small"
            value={amount}
            margin="normal"
            inputProps={{
              style: { fontSize: 30, textAlign: 'center' }
            }} // font size of input text
            InputLabelProps={{ style: { fontSize: 0 } }} // font size of input label
            onChange={onChangeAmount}
          />
        </Typography>
        <Typography
          component="span"
          variant="body2"
          sx={{
            mb: 1,
            alignSelf: 'flex-end',
            color: 'text.secondary'
          }}
        >
          {pool.symbol}
        </Typography>
      </Box>

      <Box sx={{ mt: 2, mb: 3 }}>
        {/* <Button>

        </Button> */}
        <LoadingButton
          fullWidth
          size="large"
          variant="contained"
          onClick={onClickSwap}
          disabled={!(isOpen && isSaleFunded)}
        >
          Go
        </LoadingButton>
      </Box>

      <Box sx={{ textAlign: 'center' }}>
        {warningMessage !== '' && (
          <Typography
            variant="subtitle2"
            sx={{
              mb: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Box
              component={Icon}
              icon={shieldFill}
              sx={{ width: 20, height: 20, mr: 1, color: 'primary.main' }}
            />
            Warning : {warningMessage}
          </Typography>
        )}
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Have problems Joing? Click here to read instructions.
        </Typography>
      </Box>
    </div>
  );
}

export default JoninthePool;

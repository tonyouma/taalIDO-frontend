import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import shieldFill from '@iconify-icons/eva/shield-fill';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Divider, Typography, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { useWeb3React } from '@web3-react/core';
import moment from 'moment';
import { getWalletBalance } from '../../../redux/slices/wallet';
import { formatEther } from '@ethersproject/units';
import { createSwap, getSwapList } from '../../../redux/slices/pool';
import Taalswap from 'src/utils/taalswap';
import Numbers from 'src/utils/Numbers';

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
  const [swappedAmount, setSwappedAmount] = useState(0);
  const [warningMessage, setWarningMessage] = useState('');
  const [diffTime, setDiffTime] = useState({});
  const { activatingConnector, balance } = useSelector((state) => state.wallet);
  const { swapList } = useSelector((state) => state.pool);
  const { connector, library, account } = context;

  let taalswap;

  if (!!library) {
    taalswap = new Taalswap({
      application: pool,
      account,
      library
    });
  }

  const onChangeAmount = (e) => {
    setAmount(e.target.value);
    setPrice(e.target.value * pool.tradeValue);
  };

  const addSwap = () => {
    const swap = {
      walletAddress: account,
      tokenContractAddress: pool.tokenContractAddr,
      poolName: pool.poolName,
      amount: amount,
      joinDate: moment().unix()
    };
    console.log(swap);

    dispatch(createSwap(swap));
  };

  const onClickSwap = async () => {
    try {
      if (!!library) {
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
            const temp = 5;

            if (
              Numbers.toFloat(pool.maxIndividuals) >=
              Numbers.toFloat(amount) + Numbers.toFloat(swappedAmount)
            ) {
              const result = await taalswap.swap({
                tokenAmount: amount,
                account: account
              });

              if (!!result.error) {
                console.log('error : ' + JSON.stringify(result.error));
              } else {
                setWarningMessage('');
                addSwap();
              }
            } else {
              setWarningMessage(
                `개인 구매 한도량 초과 (${swappedAmount} / ${temp})`
              );
            }
          } else {
            setWarningMessage('tokensLeft 보다 적게');
          }
        } else {
          setWarningMessage('최소값 보다 많고, 최대값 보다 적게');
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
    try {
      await dispatch(getSwapList(account));

      if (!!library) {
        await taalswap.isOpen((result) => {
          console.log(result);
          setIsOpen(result);
        });

        await taalswap.isFunded((result) => {
          console.log(result);
          setIsSaleFunded(result);
        });

        await taalswap.tokensLeft().then((result) => {
          console.log(result);
          setTokensLeft(result);
        });

        await taalswap.individualMinimumAmount().then((result) => {
          console.log(result);
          setMinAmount(result);
        });

        await taalswap.individualMaximumAmount().then((result) => {
          console.log(result);
          setMaxAmount(result);
        });

        if (!!swapList) {
          setSwappedAmount(
            await swapList
              .filter((swap) => swap.poolName === pool.poolName)
              .reduce(function (prevPool, currPool) {
                return parseFloat(prevPool) + parseFloat(currPool.amount);
              }, 0)
          );
        }
      }
      console.log(`isOpen : ${isOpen}, isSaleFunded : ${isSaleFunded}`);
    } catch (error) {
      console.log(error);
    }
  }, [pool]);

  useEffect(async () => {
    try {
      if (!!library && !!balance) {
        await dispatch(getWalletBalance(account, library));
      }
    } catch (error) {
      console.log();
    }
  }, [activatingConnector, connector]);

  return (
    <div className={clsx(classes.root, className)}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        Join the Pool {swappedAmount}
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
          Yout Bid Amount
        </Typography>
        <Typography
          component="p"
          variant="body2"
          sx={{ color: 'text.secondary' }}
        >
          Balance :{' '}
          {balance !== null ? parseFloat(formatEther(balance)).toFixed(4) : '0'}
          ETH
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
          Amount
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
          Have problems Joining? Click here to read instructions.
        </Typography>
      </Box>
    </div>
  );
}

export default JoninthePool;

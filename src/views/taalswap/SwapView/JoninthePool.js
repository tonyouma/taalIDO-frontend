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
import Numbers from 'src/utils/Numbers';
import Taalswap from 'src/utils/taalswap';
import { PoolStatus } from 'src/utils/poolStatus';
import { getPoolStatus } from '../../../utils/getPoolStatus';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import { set } from 'immutable';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 700],
    [theme.breakpoints.up('md')]: {
      height: 'calc(100% - 16px)',
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(5),
      borderRadius: theme.shape.borderRadiusMd
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
      borderRadius: theme.shape.borderRadiusMd
    }
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2.5),
    marginTop: theme.spacing(2)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));

// ----------------------------------------------------------------------

JoninthePool.propTypes = {
  className: PropTypes.string
};

function nativeCallbackTxHash(res) {
  window.MobileSendPopupComponent.setRes(res);
}

window.onCallbackTxHash = nativeCallbackTxHash.bind(this);

function JoninthePool({ className, pool, onBackdrop, ethPrice }) {
  const classes = useStyles();
  const context = useWeb3React();
  const dispatch = useDispatch();
  const history = useHistory();

  const { enqueueSnackbar } = useSnackbar();
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);
  const [tokensLeft, setTokensLeft] = useState(0);
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [swappedAmount, setSwappedAmount] = useState(0);
  const [warningMessage, setWarningMessage] = useState('');
  const [status, setStatus] = useState('');
  const [isWhiteList, setIsWhiteList] = useState(false);
  const [time, setTime] = useState({});
  const [diffTime, setDiffTime] = useState({});
  const { activatingConnector, balance } = useSelector((state) => state.wallet);
  const { os, from, wallet } = useSelector((state) => state.talken);
  const { swapList } = useSelector((state) => state.pool);
  const { connector, library, account } = context;

  let taalswap;

  window.MobileSendPopupComponent = this;

  if (!!library) {
    taalswap = new Taalswap({
      application: pool,
      account,
      library
    });
  } else {
    taalswap = new Taalswap({
      application: pool,
      notConnected: true
    });
  }

  const onChangeAmount = (e) => {
    setPrice(e.target.value * pool.tradeValue);
    setAmount(e.target.value);
  };

  const handleOnFocuse = () => {
    setPrice(0);
    setAmount('');
  };
  const addSwap = () => {
    const swap = {
      walletAddress: account,
      tokenContractAddress: pool.tokenContractAddr,
      poolName: pool.poolName,
      amount: amount,
      joinDate: moment().unix()
    };

    dispatch(createSwap(swap));
  };
  const setRes = (result) => {
    // TODO: 콜백처리
    console.log(result);
    onBackdrop(false);
  };

  const onClickSwap = async () => {
    try {
      if (!!library || from) {
        if (pool.access === 'Private' && !isWhiteList) {
          setWarningMessage(
            'Not white listed address! Please contact to the pool owner.'
          );
        } else {
          if (
            parseFloat(minAmount) < parseFloat(amount) &&
            parseFloat(amount) <= parseFloat(maxAmount)
          ) {
            if (parseFloat(amount) < parseFloat(tokensLeft)) {
              if (
                Numbers.toFloat(pool.maxIndividuals) >=
                Numbers.toFloat(amount) + Numbers.toFloat(swappedAmount)
              ) {
                onBackdrop(true);
                if (from) {
                  try {
                    const msgContents = { tokenAmount: amount, account: from };
                    msgContents.data = await taalswap.getSwapABI(msgContents);
                    let sendData = {
                      callback: 'onCallbackTxHash',
                      msgContents: msgContents
                    };
                    console.log('sendData', sendData);
                    if (os === 'IOS') {
                      alert('ios');
                      /*eslint-disable */
                      webkit.messageHandlers.sendEthTransaction.postMessage(
                        JSON.stringify(sendData)
                      );
                      /*eslint-enable */
                    } else {
                      alert('else');
                      /*eslint-disable */
                      SubWebviewBridge.sendEthTransaction(
                        JSON.stringify(sendData)
                      );
                      /*eslint-enable */
                    }
                  } catch (e) {
                    console.log(e);
                    onBackdrop(false);
                    return;
                  }
                } else {
                  console.log(`taalswap web, swap..`);
                  const result = await taalswap
                    .swap({
                      tokenAmount: amount,
                      account: from ? wallet : account
                    })
                    .catch((error) => {
                      console.log('error : ' + JSON.stringify(error));
                      enqueueSnackbar('Swap fail', {
                        variant: 'fail'
                      });
                      onBackdrop(false);
                    });

                  const receipt = await result.wait();
                  if (receipt.status === 1) {
                    enqueueSnackbar('Swap success', {
                      variant: 'success'
                    });
                    await setWarningMessage('');
                    await addSwap();

                    history.push({
                      pathname: '/app/taalswap/pools',
                      state: { tabValue: 1 }
                    });
                  }
                }

                onBackdrop(false);
              } else {
                setWarningMessage(
                  `Should be less than individual maximum! (${swappedAmount} / ${pool.maxIndividuals})`
                );
              }
            } else {
              setWarningMessage('Should be less than the amount tokens left!');
            }
          } else {
            setWarningMessage(
              'Please select an amount between individual minimum ans maximum!'
            );
          }
        }
      } else {
        console.log('aaa');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setDate = () => {
    var nowEpoch = moment();
    const startDate = moment.unix(pool.startDate);

    const result = {
      published: nowEpoch > startDate,
      date: startDate.from(nowEpoch)
    };

    setTime(result);
  };

  useEffect(async () => {
    try {
      console.log('in');
      setDate();
      setAmount(0);

      await dispatch(getSwapList(account));
      if (!!library || from) {
        await taalswap
          .tokensLeft()
          .then((result) => {
            setTokensLeft(result);
            console.log(`tokensLeft : ${result}`);
          })
          .catch((error) => console.log(error));

        await taalswap.individualMinimumAmount().then((result) => {
          setMinAmount(result);
          console.log(`individualMinimumAmount : ${result}`);
        });

        await taalswap.individualMaximumAmount().then((result) => {
          setMaxAmount(result);
          console.log(`individualMaximumAmount : ${result}`);
        });

        if (pool.access === 'Private') {
          await taalswap
            .isWhitelisted(account)
            .then((result) => {
              setIsWhiteList(result);
              console.log(`isWhitelisted : ${result}`);
            })
            .catch((error) => console.log(error));
        }

        if (!!swapList) {
          setSwappedAmount(
            await swapList
              .filter((swap) => swap.poolName === pool.poolName)
              .reduce(function (prevPool, currPool) {
                return parseFloat(prevPool) + parseFloat(currPool.amount);
              }, 0)
          );
        }
        console.log('aaa');
        setStatus(
          await getPoolStatus(taalswap, pool.status, pool.minFundRaise)
        );
      }
    } catch (error) {
      console.log(error);
    }
  }, [pool, library]);

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
        Join the Pool
      </Typography>

      <div className={classes.row}>
        <Typography
          variant="subtitle2"
          component="p"
          sx={{ color: 'text.secondary' }}
        >
          {time.published && `Published about ${time.date}`}
        </Typography>
      </div>

      <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />

      <div className={classes.row}>
        <Typography
          component="p"
          variant="subtitle2"
          sx={{ color: 'text.secondary' }}
        >
          Your Bid Amount
        </Typography>
        <Typography
          component="p"
          variant="body2"
          sx={{ color: 'text.secondary' }}
        >
          Balance :{' '}
          {balance !== null ? parseFloat(formatEther(balance)).toFixed(2) : '0'}{' '}
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
          {`Amount : ${price} ETH ($ ${Numbers.toFloat(
            price * ethPrice
          ).toFixed()})`}
          {/* Price : {price} ETH  */}
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
            // error={amount < 0 ? true : false}
            // helperText="양수 입력"
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
            onFocus={handleOnFocuse}
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

      <Box sx={{ mt: 2, mb: 2 }}>
        {pool.access === 'Public' && (
          <LoadingButton
            fullWidth
            size="large"
            variant="contained"
            onClick={onClickSwap}
            // disabled={status !== PoolStatus.LIVE}
            // disabled={status !== PoolStatus.FILLED.SUCCESS.ACCOMPLISHED}
          >
            Go
          </LoadingButton>
        )}

        {pool.access === 'Private' && (
          <LoadingButton
            fullWidth
            size="large"
            variant="contained"
            onClick={onClickSwap}
            // disabled={status !== PoolStatus.LIVE || isWhiteList === false}
          >
            Go
          </LoadingButton>
        )}
      </Box>

      <Box sx={{ textAlign: 'center' }}>
        {warningMessage !== '' && (
          <Typography
            variant="subtitle2"
            sx={{
              mb: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'red'
            }}
          >
            <Box
              component={Icon}
              icon={shieldFill}
              sx={{ width: 20, height: 20, mr: 1 }}
            />
            {warningMessage}
          </Typography>
        )}
        {/* <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Have problems Joining? Click here to read instructions.
        </Typography> */}
      </Box>
    </div>
  );
}

export default JoninthePool;

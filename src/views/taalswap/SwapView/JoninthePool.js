import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import shieldFill from '@iconify-icons/eva/shield-fill';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Divider,
  Typography,
  TextField,
  CircularProgress
} from '@material-ui/core';
import { LoadingButton, treeViewClasses } from '@material-ui/lab';
import { useWeb3React } from '@web3-react/core';
import moment from 'moment';
import 'moment/locale/en-gb';
import 'moment/locale/ko';
import { getWalletBalance } from '../../../redux/slices/wallet';
import { formatEther } from '@ethersproject/units';
import {
  createSwap,
  getSwapList,
  changeSwapStart,
  changeSwapEnd
} from '../../../redux/slices/pool';
import Numbers from 'src/utils/Numbers';
import Taalswap from 'src/utils/taalswap';
import { PoolStatus } from 'src/utils/poolStatus';
import { getPoolStatus } from '../../../utils/getPoolStatus';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import WalletDialog from '../Components/WalletDialog';

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
  window.setRes(res);
}

window.onCallbackTxHash = nativeCallbackTxHash.bind(this);

function JoninthePool({ className, pool, onBackdrop, ethPrice }) {
  const classes = useStyles();
  const context = useWeb3React();
  const dispatch = useDispatch();
  const history = useHistory();

  const { enqueueSnackbar } = useSnackbar();
  // const [progressFlag, setProgressFlag] = useState(false);
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);
  const [tokensLeft, setTokensLeft] = useState(0);
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [swappedAmount, setSwappedAmount] = useState(0);
  const [soldoutFlag, setSoldout] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [status, setStatus] = useState('');
  const [isWhiteList, setIsWhiteList] = useState(false);
  const [time, setTime] = useState({});
  const [diffTime, setDiffTime] = useState({});
  const { activatingConnector, balance } = useSelector((state) => state.wallet);
  const { os, from, wallet } = useSelector((state) => state.talken);
  const { swapList, swapFlag } = useSelector((state) => state.pool);
  const { connector, library, account, activate } = context;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { i18n, t } = useTranslation();
  const langStorage = localStorage.getItem('i18nextLng');

  let taalswap;

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
      walletAddress: from ? wallet : account,
      tokenContractAddress: pool.tokenContractAddr,
      poolName: pool.poolName,
      amount: amount,
      joinDate: moment().unix()
    };
    // console.log('=====', JSON.stringify(swap));
    dispatch(createSwap(swap));
  };

  const setRes = async (result) => {
    try {
      const rslt = JSON.parse(result);
      if (rslt.result) {
        const receipt = await taalswap.waitTxHash(rslt.txHash);
        // console.log('=====', JSON.stringify(receipt));
        if (receipt.status === 1) {
          enqueueSnackbar('Swap success', {
            variant: 'success'
          });
          // setProgressFlag(false);
          dispatch(changeSwapEnd());
          await setWarningMessage('');
          await addSwap();

          history.push({
            pathname: '/app/taalswap/pools',
            state: { tabValue: 1 }
          });
        } else {
          // setProgressFlag(false);
          dispatch(changeSwapEnd());
          // console.log('=====', receipt.status);
          enqueueSnackbar('Swap fail', {
            variant: 'fail'
          });
        }
      } else {
        // setProgressFlag(false);
        dispatch(changeSwapEnd());
        enqueueSnackbar('Swap fail', {
          variant: 'fail'
        });
      }
    } catch (e) {
      // setProgressFlag(false);
      dispatch(changeSwapEnd());
      enqueueSnackbar('Swap error', {
        variant: 'error'
      });
    }
    // onBackdrop(false);
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
                // onBackdrop(true);
                // setProgressFlag(true);
                setWarningMessage('');
                dispatch(changeSwapStart());
                if (from) {
                  try {
                    let amountWithDecimals = Numbers.toSmartContractDecimals(
                      amount,
                      pool.decimals
                    );
                    let ETHCost = await taalswap.getETHCostFromTokens({
                      tokenAmount: amount
                    });
                    let ETHToWei = Numbers.toSmartContractDecimals(
                      ETHCost,
                      pool.decimals
                    );
                    const data = await taalswap.getSwapABI({
                      amountWithDecimals: amountWithDecimals,
                      value: ETHToWei
                    });
                    const msgContents = {
                      method: 'swap',
                      from: wallet,
                      to: pool.contractAddress,
                      value: ETHToWei,
                      amount: amount,
                      data: data,
                      gasLimit: 300000
                    };
                    let sendData = {
                      callback: 'onCallbackTxHash',
                      msgContents: msgContents
                    };
                    // console.log('sendData', sendData);
                    if (os.toLowerCase() === 'ios') {
                      /*eslint-disable */
                      webkit.messageHandlers.sendEthTransaction.postMessage(
                        JSON.stringify(sendData)
                      );
                      /*eslint-enable */
                    } else {
                      /*eslint-disable */
                      SubWebviewBridge.sendEthTransaction(
                        JSON.stringify(sendData)
                      );
                      /*eslint-enable */
                    }
                  } catch (e) {
                    console.log(e);
                    // onBackdrop(false);
                    // setProgressFlag(false);
                    dispatch(changeSwapEnd());
                  }
                  return;
                } else {
                  // console.log(`taalswap web, swap..`);
                  // console.log(progressFlag);

                  const result = await taalswap
                    .swap({
                      tokenAmount: amount,
                      account: from ? wallet : account
                    })
                    .catch((error) => {
                      console.log(error);
                    });

                  const receipt = await result.wait();
                  if (receipt.status === 1) {
                    enqueueSnackbar('Swap success', {
                      variant: 'success'
                    });
                    setWarningMessage('');
                    await addSwap();

                    history.push({
                      pathname: '/app/taalswap/pools',
                      state: { tabValue: 1 }
                    });
                  } else {
                    // console.log(receipt);
                    enqueueSnackbar('Swap fail', {
                      variant: 'fail'
                    });
                    // onBackdrop(false);
                    // setProgressFlag(false);
                    dispatch(changeSwapEnd());
                  }
                }

                // onBackdrop(false);
                // setProgressFlag(false);
                dispatch(changeSwapEnd());
              } else {
                setWarningMessage(
                  `${t('taalswap.WarnIndivMax')} (${swappedAmount} / ${
                    pool.maxIndividuals
                  })`
                );
              }
            } else {
              setWarningMessage(`${t('taalswap.WarnLeft')}`);
            }
          } else {
            setWarningMessage(`${t('taalswap.WarnIndivMinMAx')}`);
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
      // console.log('in...........');
      window.setRes = setRes;
      setDate();
      setAmount(0);

      await dispatch(getSwapList(account));
      if (!!library || from) {
        await taalswap
          .tokensLeft()
          .then((result) => {
            setTokensLeft(result);
            if (result === 0) {
              setSoldout(true);
            } else {
              setSoldout(false);
            }
            // console.log(`tokensLeft : ${result}`);
          })
          .catch((error) => console.log(error));

        await taalswap.individualMinimumAmount().then((result) => {
          setMinAmount(result);
          // console.log(`individualMinimumAmount : ${result}`);
        });

        await taalswap.individualMaximumAmount().then((result) => {
          setMaxAmount(result);
          // console.log(`individualMaximumAmount : ${result}`);
        });

        if (pool.access === 'Private') {
          await taalswap
            .isWhitelisted(wallet ? wallet : account)
            .then((result) => {
              setIsWhiteList(result);
              // console.log(`isWhitelisted : ${result}`);
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

  useEffect(() => {
    switch (i18n.language) {
      case 'en':
        moment.locale('en-gb');
        break;
      case 'kr':
        moment.locale('ko');
        break;
    }
    setDate();
  }, [i18n.language]);

  return (
    <Box className={clsx(classes.root, className)}>
      <Typography variant="h3" sx={{ mb: 1 }}>
        {t('taalswap.JoinThePool')}
      </Typography>

      <div className={classes.row}>
        <Typography
          variant="subtitle2"
          component="p"
          sx={{ color: 'text.secondary' }}
        >
          {time.published === true
            ? i18n.language === 'en'
              ? `Started in ${time.date}.`
              : `${time.date} 시작됨`
            : i18n.language === 'en'
            ? `Starting ${time.date}.`
            : `${time.date} 시작됨`}
        </Typography>
      </div>

      <Divider sx={{ borderStyle: 'dashed', mt: 3, mb: 3 }} />

      <div className={classes.row}>
        <Typography
          component="p"
          variant="subtitle2"
          sx={{ color: 'text.secondary' }}
        >
          {t('taalswap.YourBidAmount')}
        </Typography>
        <Typography
          component="p"
          variant="body2"
          sx={{ color: 'text.secondary' }}
        >
          {t('taalswap.Balance')} :{' '}
          {balance !== null ? parseFloat(formatEther(balance)).toFixed(2) : '0'}{' '}
          ETH
        </Typography>
      </div>

      <Box sx={{ mb: 1.5, display: 'flex', justifyContent: 'flex-end' }}>
        <Typography
          component="span"
          variant="body2"
          sx={{
            mb: 1.5,
            alignSelf: 'flex-end',
            color: 'text.secondary'
          }}
        >
          {t('taalswap.Amount')}
          {langStorage === 'kr'
            ? ` : ${price} ETH (₩ ${Numbers.toFloat(
                price * ethPrice
              ).toFixed()})`
            : ` : ${price} ETH ($ ${Numbers.toFloat(
                price * ethPrice
              ).toFixed()})`}
          {/* Price : {price} ETH  */}
        </Typography>
      </Box>

      <Divider sx={{ borderStyle: 'dashed', mt: 3, mb: 3 }} />

      <Box className={classes.row} sx={{ mb: 3 }}>
        <Typography
          component="p"
          variant="subtitle2"
          sx={{ color: 'text.secondary' }}
        >
          {t('taalswap.Amount')}
        </Typography>
      </Box>

      <Box sx={{ mb: 2.5, display: 'flex', justifyContent: 'flex-end' }}>
        {/* <Typography variant="h2" sx={{ mx: 1 }}> */}

        <TextField
          type="number"
          fullWidth
          // sx={{
          //   flex: 2 / 5,
          //   flexWrap: 'wrap'
          // }}
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
        {/* </Typography> */}
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

      <Box sx={{ mt: 5, mb: 2 }}>
        {pool.access === 'Public' && (account || from) && (
          <LoadingButton
            fullWidth
            size="large"
            variant="contained"
            onClick={onClickSwap}
            disabled={
              status !== PoolStatus.LIVE ||
              swapFlag === true ||
              soldoutFlag === true
            }
            // disabled={status !== PoolStatus.FILLED.SUCCESS.ACCOMPLISHED}
          >
            {/* {progressFlag === true ? ( */}
            {swapFlag === true ? (
              <Box display="flex" alignItems="center">
                <CircularProgress color="inherit" />
                <Typography marginLeft="1rem">
                  {t('taalswap.InProgress')}{' '}
                </Typography>
              </Box>
            ) : (
              t('taalswap.Go')
            )}
          </LoadingButton>
        )}

        {pool.access === 'Private' && (account || from) && (
          <LoadingButton
            fullWidth
            size="large"
            variant="contained"
            onClick={onClickSwap}
            disabled={
              status !== PoolStatus.LIVE ||
              isWhiteList === false ||
              swapFlag === true ||
              soldoutFlag === true
            }
          >
            {/* {progressFlag === true ? ( */}
            {swapFlag === true ? (
              <Box display="flex" alignItems="center">
                <CircularProgress color="inherit" />
                <Typography marginLeft="1rem">
                  {t('taalswap.InProgress')}{' '}
                </Typography>
              </Box>
            ) : (
              t('taalswap.Go')
            )}
            {/* {progressFlag && <CircularProgress />} {t('taalswap.Go')} */}
          </LoadingButton>
        )}

        {!account && !from && (
          <LoadingButton
            fullWidth
            size="large"
            variant="contained"
            onClick={() => setIsOpenModal(true)}
          >
            {t('taalswap.ConnectWallet')}
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
      <WalletDialog
        isOpenModal={isOpenModal}
        handleCloseModal={() => setIsOpenModal(false)}
        activate={activate}
      />
    </Box>
  );
}

export default JoninthePool;

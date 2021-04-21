import React, { useEffect, useState } from 'react';
import Scrollbars from 'src/components/Scrollbars';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import {
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
  CircularProgress,
  Hidden,
  IconButton,
  InputLabel,
  Input
} from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { filter } from 'lodash';
import { closeModal, openModal } from '../../../redux/slices/pool';
import getMax from '../../../utils/getMax';
import getProgressValue from '../../../utils/getProgressValue';
import { useWeb3React } from '@web3-react/core';
import { getSwapList } from '../../../redux/slices/pool';
import StatusLabel from '../Components/StatusLabel';
import { getPoolStatus } from '../../../utils/getPoolStatus';
import Taalswap from 'src/utils/taalswap';
import { PoolStatus } from 'src/utils/poolStatus';
import Numbers from 'src/utils/Numbers';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import RedeemIcon from '@material-ui/icons/Redeem';
import LinkIcon from '@material-ui/icons/Link';
import { infuraChainId } from 'src/config';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  contentTextField: {
    color: theme.palette.primary.main,
    '& .MuiFormLabel-root': {
      color: theme.palette.primary.main
    },
    marginTop: '1rem'
  },
  button: {
    width: '130px'
  },
  dialogTitle: {
    color: theme.palette.primary.main
  }
}));

function nativeCallbackTxHash(res) {
  window.setRes(res);
}

window.onCallbackTxHash = nativeCallbackTxHash.bind(this);

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------

function applyFilter(array, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  if (query) {
    array = filter(array, (_user) => {
      return _user.poolName.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    return array;
  }
  return stabilizedThis.map((el) => el[0]);
}

// ----------------------------------------------------------------------

function TablePoolRow({ row, handleOpenModal }) {
  const classes = useStyles();
  const context = useWeb3React();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [progressValue, setProgressValue] = useState(0);
  const [poolStatus, setStatus] = useState('');
  const [max, setMax] = useState(0);

  const { library, account } = context;
  const { os, wallet, from } = useSelector((state) => state.talken);

  let taalswap;
  if (!!library) {
    taalswap = new Taalswap({
      application: row,
      account,
      library
    });
  } else if (!!from) {
    taalswap = new Taalswap({
      application: row,
      notConnected: true
    });
  }

  useEffect(async () => {
    if (!!library || !!from) {
      await taalswap
        .tokensAllocated()
        .then((result) => {
          setProgressValue(getProgressValue(result, row.tradeAmount));
        })
        .catch((error) => console.log(error));

      const status = await getPoolStatus(
        taalswap,
        row.status,
        row.minFundRaise
      );
      setStatus(status);
      setMax();
    }

    return () => {};
  }, [row, library]);

  return (
    <TableRow
      key={row.poolName}
      hover
      className={(classes.hideLastBorder, classes.row)}
      // onClick={(event) => handleOpenModal(row, poolStatus)}
    >
      <TableCell component="th" scope="row" width="20%">
        {row.poolName}
      </TableCell>
      <Hidden smDown>
        <TableCell align="right" width="20%">
          {Numbers.toFloat(row.ratio)} {row.symbol} = 1 ETH
        </TableCell>
        <TableCell align="right" width="10%">
          {row.access}
        </TableCell>
        <TableCell align="right" width="10%">
          {row.category}
        </TableCell>
      </Hidden>
      <TableCell align="right" width="30%">
        <LinearProgressWithLabel value={progressValue} />
      </TableCell>
      <TableCell align="right" width="20%">
        {poolStatus === '' ? (
          <CircularProgress color="primary" size="1rem" />
        ) : (
          <StatusLabel poolStatus={poolStatus} />
        )}
      </TableCell>
      <TableCell align="right" width="20%">
        {poolStatus !== PoolStatus.LIVE ? (
          <IconButton
            variant="contained"
            size="small"
            onClick={(event) => handleOpenModal(row, poolStatus, taalswap)}
          >
            <RedeemIcon />
          </IconButton>
        ) : null}
      </TableCell>
    </TableRow>
  );
}

export default function MyPools({ filterName, category, onBackdrop }) {
  const classes = useStyles();
  const history = useHistory();
  const { i18n, t } = useTranslation();

  const [filterPoolList, setFilterPoolList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [poolStatus, setPoolStatus] = useState('');
  const [currentPuchasesId, setCurrentPuchasesId] = useState('');
  const [myPurchases, setMyPurchases] = useState([]);
  const [finalizedFalseList, setFinalizedFalseList] = useState([]);
  const [progressFlag, setProgressFlag] = useState(false);
  const [max, setMax] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const context = useWeb3React();
  const dispatch = useDispatch();
  const { poolList, swapList, isOpenModal, selectedPool } = useSelector(
    (state) => state.pool
  );
  const { library, account } = context;
  const { os, wallet, from } = useSelector((state) => state.talken);

  let taalswap;
  if (!!library) {
    taalswap = new Taalswap({
      application: selectedPool,
      account,
      library
    });
  } else if (!!from) {
    taalswap = new Taalswap({
      application: selectedPool,
      notConnected: true
    });
  }

  const setRes = async (result) => {
    try {
      const rslt = JSON.parse(result);
      if (rslt.result) {
        const receipt = await taalswap.waitTxHash(rslt.txHash);
        console.log('=====', JSON.stringify(receipt));
        if (receipt.status === 1) {
          enqueueSnackbar('Claim success', {
            variant: 'success'
          });
          const newList = finalizedFalseList.filter(
            (id) => id !== currentPuchasesId
          );
          setFinalizedFalseList(newList);
          setProgressFlag(false);
        } else {
          console.log('=====', receipt.status);
          enqueueSnackbar('Claim fail', {
            variant: 'fail'
          });
          setProgressFlag(false);
        }
      } else {
        enqueueSnackbar('Claim fail', {
          variant: 'fail'
        });
        setProgressFlag(false);
      }
    } catch (e) {
      enqueueSnackbar('Claim error', {
        variant: 'error'
      });
      setProgressFlag(false);
    }
    // onBackdrop(false);
    // setProgressFlag(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(async () => {
    await dispatch(getSwapList(wallet ? wallet : account));
    await getMySwapList();
    window.setRes = setRes;
  }, [dispatch]);

  const handleOpenModal = async (row, poolStatus, taalswap) => {
    try {
      if (!!library || from) {
        const myPurchases = await taalswap.getAddressPurchaseIds({
          address: from ? wallet : account
        });
        let wasFinalizedArray = [];
        await myPurchases.map(async (purchaseid) => {
          await taalswap.purchases({ id: purchaseid }).then((result) => {
            if (result.wasFinalized === false)
              wasFinalizedArray = wasFinalizedArray.concat(purchaseid);
            setFinalizedFalseList(wasFinalizedArray);
          });
        });

        setMyPurchases(myPurchases);
        setPoolStatus(poolStatus);
        setMax(getMax(row.maxIndividuals, row.tradeValue));
        dispatch(openModal(row));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleOnClickSwap = () => {
    dispatch(closeModal());
    history.push({
      pathname: '/app/taalswap/pools/swap',
      state: { selectedPool: selectedPool }
    });
  };

  const handleOnClickClaimETH = async () => {
    try {
      if (!!library || from) {
        if (finalizedFalseList.length !== 0) {
          // onBackdrop(true);
          setProgressFlag(true);
          setCurrentPuchasesId(finalizedFalseList[0]);
          if (from) {
            const data = await taalswap.getRedeemGivenMinimumGoalNotAchievedABI(
              {
                // purchase_id: finalizedFalseList[0]
                purchase_id: currentPuchasesId
              }
            );
            console.log('=====data', data);
            const msgContents = {
              method: 'redeemGivenMinimumGoalNotAchieved',
              from: wallet,
              to: selectedPool.contractAddress,
              // purchase_id: finalizedFalseList[0],
              purchase_id: currentPuchasesId,
              data: data
            };
            console.log('=====', JSON.stringify(msgContents));
            let sendData = {
              callback: 'onCallbackTxHash',
              msgContents: msgContents
            };
            if (os.toLowerCase() === 'ios') {
              /*eslint-disable */
              webkit.messageHandlers.sendEthTransaction.postMessage(
                JSON.stringify(sendData)
              );
              /*eslint-enable */
            } else {
              /*eslint-disable */
              SubWebviewBridge.sendEthTransaction(JSON.stringify(sendData));
              /*eslint-enable */
            }
          } else {
            const result = await taalswap
              .redeemGivenMinimumGoalNotAchieved({
                // purchase_id: finalizedFalseList[0]
                purchase_id: currentPuchasesId
              })
              .catch((error) => {
                console.log(error);
                enqueueSnackbar('Claim ETH fail', {
                  variant: 'fail'
                });
                setProgressFlag(false);
              });

            if (result !== undefined) {
              const receipt = await result.wait();
              if (receipt.status === 1) {
                const newList = finalizedFalseList.filter(
                  // (id) => id !== finalizedFalseList[0]
                  (id) => id !== currentPuchasesId
                );
                setFinalizedFalseList(newList);
                enqueueSnackbar('Claim ETH success', {
                  variant: 'success'
                });
                setProgressFlag(false);
              }
            }
          }
        }

        // console.log(taalswap);
        // const myPurchases = await taalswap.getAddressPurchaseIds({
        //   address: from ? wallet : account
        // });

        // if (!!myPurchases.error) {
        // } else {
        //   console.log('===== start handleOnClickClaimETH');
        //   myPurchases.map(async (purchases) => {
        //     onBackdrop(true);
        //     if (from) {
        //       const data = await taalswap.getRedeemGivenMinimumGoalNotAchievedABI(
        //         {
        //           purchase_id: purchases
        //         }
        //       );
        //       console.log('=====data', data);
        //       const msgContents = {
        //         method: 'redeemGivenMinimumGoalNotAchieved',
        //         from: wallet,
        //         to: selectedPool.contractAddress,
        //         purchase_id: purchases,
        //         data: data
        //       };
        //       console.log('=====', JSON.stringify(msgContents));
        //       let sendData = {
        //         callback: 'onCallbackTxHash',
        //         msgContents: msgContents
        //       };
        //       if (os.toLowerCase() === 'ios') {
        //         /*eslint-disable */
        //         webkit.messageHandlers.sendEthTransaction.postMessage(
        //           JSON.stringify(sendData)
        //         );
        //         /*eslint-enable */
        //       } else {
        //         /*eslint-disable */
        //         SubWebviewBridge.sendEthTransaction(JSON.stringify(sendData));
        //         /*eslint-enable */
        //       }
        //     } else {
        //       const result = await taalswap
        //         .redeemGivenMinimumGoalNotAchieved({
        //           purchase_id: purchases
        //         })
        //         .catch((error) => {
        //           console.log(error);
        //           enqueueSnackbar('Claim ETH fail', {
        //             variant: 'fail'
        //           });
        //         });

        //       if (result !== undefined) {
        //         const receipt = await result.wait();
        //         if (receipt.status === 1) {
        //           enqueueSnackbar('Claim ETH success', {
        //             variant: 'success'
        //           });
        //         }
        //       }
        //       onBackdrop(false);
        //     }
        //   });
        // }

        // dispatch(closeModal());
      }
    } catch (error) {
      console.log('=====', error);
    }
  };

  const handleOnClickClaimTokens = async () => {
    try {
      if (!!library || from) {
        if (finalizedFalseList.length !== 0) {
          setProgressFlag(true);
          setCurrentPuchasesId(finalizedFalseList[0]);
          if (from) {
            const data = await taalswap.getRedeemTokensABI({
              // purchase_id: finalizedFalseList[0]
              purchase_id: currentPuchasesId
            });
            console.log('=====data', data);
            const msgContents = {
              method: 'redeemTokens',
              from: wallet,
              to: selectedPool.contractAddress,
              // purchase_id: finalizedFalseList[0],
              purchase_id: currentPuchasesId,
              data: data
            };
            console.log('=====', JSON.stringify(msgContents));
            let sendData = {
              callback: 'onCallbackTxHash',
              msgContents: msgContents
            };
            if (os.toLowerCase() === 'ios') {
              /*eslint-disable */
              webkit.messageHandlers.sendEthTransaction.postMessage(
                JSON.stringify(sendData)
              );
              /*eslint-enable */
            } else {
              /*eslint-disable */
              SubWebviewBridge.sendEthTransaction(JSON.stringify(sendData));
              /*eslint-enable */
            }
          } else {
            const result = await taalswap
              .redeemTokens({
                // purchase_id: finalizedFalseList[0]
                purchase_id: currentPuchasesId
              })
              .catch((error) => {
                console.log(error);
                enqueueSnackbar('Claim Tokens fail', {
                  variant: 'fail'
                });
                setProgressFlag(false);
              });

            if (result !== undefined) {
              const receipt = await result.wait();
              if (receipt.status === 1) {
                const newList = finalizedFalseList.filter(
                  // (id) => id !== finalizedFalseList[0]
                  (id) => id !== currentPuchasesId
                );
                setFinalizedFalseList(newList);
                enqueueSnackbar('Claim Tokens success', {
                  variant: 'success'
                });
                setProgressFlag(false);
              }
            }
          }
        }
        // console.log('=====handleOnClickClaimTokens');
        // const myPurchases = await taalswap.getAddressPurchaseIds({
        //   address: from ? wallet : account
        // });

        // if (!!myPurchases.error) {
        //   console.log(myPurchases.error);
        // } else {
        //   console.log('===== start handleOnClickClaimTokens');
        //   myPurchases.map(async (purchases) => {
        //     onBackdrop(true);
        //     if (from) {
        //       const data = await taalswap.getRedeemTokensABI({
        //         purchase_id: purchases
        //       });
        //       console.log('=====data', data);
        //       const msgContents = {
        //         method: 'redeemTokens',
        //         from: wallet,
        //         to: selectedPool.contractAddress,
        //         purchase_id: purchases,
        //         data: data
        //       };
        //       console.log('=====', JSON.stringify(msgContents));
        //       let sendData = {
        //         callback: 'onCallbackTxHash',
        //         msgContents: msgContents
        //       };
        //       if (os.toLowerCase() === 'ios') {
        //         /*eslint-disable */
        //         webkit.messageHandlers.sendEthTransaction.postMessage(
        //           JSON.stringify(sendData)
        //         );
        //         /*eslint-enable */
        //       } else {
        //         /*eslint-disable */
        //         SubWebviewBridge.sendEthTransaction(JSON.stringify(sendData));
        //         /*eslint-enable */
        //       }
        //     } else {
        //       const result = await taalswap
        //         .redeemTokens({
        //           purchase_id: purchases
        //         })
        //         .catch((error) => {
        //           console.log(error);
        //           enqueueSnackbar('Claim Tokens fail', {
        //             variant: 'fail'
        //           });
        //         });

        //       if (result !== undefined) {
        //         const receipt = await result.wait();
        //         if (receipt.status === 1) {
        //           enqueueSnackbar('Claim Tokens success', {
        //             variant: 'success'
        //           });
        //         }
        //       }
        //       onBackdrop(false);
        //     }
        //   });
        // }

        // dispatch(closeModal());
      }
    } catch (error) {
      console.log('=====', error);
    }
  };

  const getMySwapList = () => {
    if (!!swapList && swapList.length > 0) {
      const myPoolList = swapList.map((pool) => pool.poolName);
      const filterPoolNames = myPoolList.filter(
        (pool, index) => myPoolList.indexOf(pool) === index
      );

      setFilterPoolList(
        poolList.filter(
          (pool) => filterPoolNames.includes(pool.poolName) === true
        )
      );
    }
  };

  const filteredPools = applyFilter(
    category === 'All'
      ? filterPoolList.filter((pool) => pool.contractAddress !== '')
      : filterPoolList.filter(
          (pool) => pool.contractAddress !== '' && pool.category === category
        ),
    filterName
  );

  return (
    <div className={classes.root}>
      <Scrollbars>
        <TableContainer sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell component="th">
                  {t('taalswap.ProjectName')}
                </TableCell>
                <Hidden smDown>
                  <TableCell align="right">{t('taalswap.Ratio')}</TableCell>
                  <TableCell align="right">{t('taalswap.Access')}</TableCell>
                  <TableCell align="right">{t('taalswap.Category2')}</TableCell>
                </Hidden>
                <TableCell align="right">{t('taalswap.Progress')}</TableCell>
                <TableCell align="right">{t('taalswap.Status')}</TableCell>
                <TableCell align="right">{t('taalswap.Claim')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPools
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TablePoolRow
                    key={index}
                    row={row}
                    handleOpenModal={handleOpenModal}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          page={page}
          component="div"
          count={filteredPools.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[10, 25, 100]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {selectedPool && (
          <Dialog
            open={isOpenModal}
            onClose={handleCloseModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle
              className={classes.dialogTitle}
              id="customized-dialog-title"
              onClose={handleCloseModal}
            >
              {t('taalswap.ClaimDetails')}
            </DialogTitle>
            <DialogContent dividers>
              <InputLabel
                className={classes.contentTextField}
                style={{ fontSize: '12px' }}
                htmlFor="standard-adornment-password"
                color="primary"
              >
                {t('taalswap.TokenAddress')}
              </InputLabel>
              <Input
                fullWidth
                id="standard-adornment-password"
                value={selectedPool.tokenContractAddr}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      variant="link"
                      href={`https://${infuraChainId}.etherscan.io/address/${selectedPool.tokenContractAddr}`}
                      target="_blank"
                    >
                      <LinkIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />

              <TextField
                className={classes.contentTextField}
                label={t('taalswap.TotalPurchases')}
                variant="standard"
                InputLabelProps={{
                  shrink: true
                }}
                value={myPurchases.length}
                fullWidth
              />
              <TextField
                className={classes.contentTextField}
                label={t('taalswap.ClaimDone')}
                variant="standard"
                InputLabelProps={{
                  shrink: true
                }}
                value={myPurchases.length - finalizedFalseList.length}
                fullWidth
              />
              <TextField
                className={classes.contentTextField}
                color="primary"
                label={t('taalswap.ClaimLeft')}
                variant="standard"
                InputLabelProps={{
                  shrink: true
                }}
                value={finalizedFalseList.length}
                fullWidth
              />
              {progressFlag && (
                <Box
                  style={{
                    marginTop: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <CircularProgress />
                  <Typography variant="body2">
                    {t('taalswap.InProgress')}
                  </Typography>
                </Box>
              )}
            </DialogContent>
            <DialogActions style={{ marginTop: '-30px' }}>
              <Button
                className={classes.button}
                variant="outlined"
                color="inherit"
                onClick={handleCloseModal}
              >
                {t('taalswap.Cancel')}
              </Button>
              {poolStatus === PoolStatus.LIVE && (
                <Button
                  className={classes.button}
                  variant="contained"
                  onClick={handleOnClickSwap}
                  color="primary"
                  autoFocus
                >
                  {t('taalswap.Swap')}
                </Button>
              )}

              {poolStatus === PoolStatus.FILLED.FAILED && (
                <Button
                  className={classes.button}
                  variant="contained"
                  onClick={handleOnClickClaimETH}
                  color="primary"
                  autoFocus
                  disabled={finalizedFalseList.length === 0 || progressFlag}
                >
                  {t('taalswap.ClaimETH')}
                </Button>
              )}
              {(poolStatus === PoolStatus.FILLED.SUCCESS.ACCOMPLISHED ||
                poolStatus === PoolStatus.FILLED.SUCCESS.CLOSED) && (
                <Button
                  className={classes.button}
                  variant="contained"
                  onClick={handleOnClickClaimTokens}
                  color="primary"
                  autoFocus
                  disabled={finalizedFalseList.length === 0 || progressFlag}
                >
                  {t('taalswap.ClaimTokens')}
                </Button>
              )}
            </DialogActions>
          </Dialog>
        )}
      </Scrollbars>
    </div>
  );
}

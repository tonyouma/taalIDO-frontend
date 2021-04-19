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
  Hidden
} from '@material-ui/core';

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

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  contentTextField: {
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
  },

  row: {
    '&:hover': {
      cursor: 'pointer'
    }
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

  useEffect(async () => {
    if (!!library || !!from) {
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
      onClick={(event) => handleOpenModal(row, poolStatus)}
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
    </TableRow>
  );
}

export default function MyPools({ filterName, category, onBackdrop }) {
  const classes = useStyles();
  const history = useHistory();
  const { i18n, t } = useTranslation();

  // const [filterName, setFilterName] = useState('');
  const [filterPoolList, setFilterPoolList] = useState([]);
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [poolStatus, setPoolStatus] = useState('');
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
        } else {
          console.log('=====', receipt.status);
          enqueueSnackbar('Claim fail', {
            variant: 'fail'
          });
        }
      } else {
        enqueueSnackbar('Claim fail', {
          variant: 'fail'
        });
      }
    } catch (e) {
      enqueueSnackbar('Claim error', {
        variant: 'error'
      });
    }
    onBackdrop(false);
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

  // const handleFilterByName = (event) => {
  //   setFilterName(event.target.value);
  // };

  const handleOpenModal = (row, poolStatus) => {
    setPoolStatus(poolStatus);
    setMax(getMax(row.maxIndividuals, row.tradeValue));
    dispatch(openModal(row));
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
        const myPurchases = await taalswap.getAddressPurchaseIds({
          address: from ? wallet : account
        });

        if (!!myPurchases.error) {
        } else {
          console.log('===== start handleOnClickClaimETH');
          myPurchases.map(async (purchases) => {
            onBackdrop(true);
            if (from) {
              const data = await taalswap.getRedeemGivenMinimumGoalNotAchievedABI(
                purchases
              );
              console.log('=====data', data);
              const msgContents = {
                method: 'redeemGivenMinimumGoalNotAchieved',
                from: wallet,
                to: selectedPool.contractAddress,
                purchase_id: purchases,
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
                  purchase_id: purchases
                })
                .catch((error) => {
                  console.log(error);
                  enqueueSnackbar('Claim ETH fail', {
                    variant: 'fail'
                  });
                });

              if (result !== undefined) {
                const receipt = await result.wait();
                if (receipt.status === 1) {
                  enqueueSnackbar('Claim ETH success', {
                    variant: 'success'
                  });
                }
              }
              onBackdrop(false);
            }
          });
        }

        dispatch(closeModal());
      }
    } catch (error) {
      console.log('=====', error);
    }
  };

  const handleOnClickClaimTokens = async () => {
    try {
      if (!!library || from) {
        console.log('=====handleOnClickClaimTokens');
        const myPurchases = await taalswap.getAddressPurchaseIds({
          address: from ? wallet : account
        });

        if (!!myPurchases.error) {
          console.log(myPurchases.error);
        } else {
          console.log('===== start handleOnClickClaimTokens');
          myPurchases.map(async (purchases) => {
            onBackdrop(true);
            if (from) {
              const data = await taalswap.getRedeemTokensABI({
                purchase_id: purchases
              });
              console.log('=====data', data);
              const msgContents = {
                method: 'redeemTokens',
                from: wallet,
                to: selectedPool.contractAddress,
                purchase_id: purchases,
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
                  purchase_id: purchases
                })
                .catch((error) => {
                  console.log(error);
                  enqueueSnackbar('Claim Tokens fail', {
                    variant: 'fail'
                  });
                });

              if (result !== undefined) {
                const receipt = await result.wait();
                if (receipt.status === 1) {
                  enqueueSnackbar('Claim Tokens success', {
                    variant: 'success'
                  });
                }
              }
              onBackdrop(false);
            }
          });
        }

        dispatch(closeModal());
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
  // const filteredPools = applyFilter(filterPoolList, filterName);
  // const filteredPools = applyFilter(poolList, filterName);

  return (
    <div className={classes.root}>
      {/* <ToolbarTable filterName={filterName} onFilterName={handleFilterByName} /> */}
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
              Pool Details
            </DialogTitle>
            <DialogContent dividers>
              <TextField
                className={classes.contentTextField}
                label="Pool"
                variant="standard"
                InputLabelProps={{
                  shrink: true
                }}
                value={selectedPool.poolName}
                fullWidth
              />
              <TextField
                className={classes.contentTextField}
                label="Token Address"
                variant="standard"
                InputLabelProps={{
                  shrink: true
                }}
                value={selectedPool.tokenContractAddr}
                fullWidth
              />
              <TextField
                className={classes.contentTextField}
                label="Max"
                variant="standard"
                InputLabelProps={{
                  shrink: true
                }}
                value={`${Numbers.toFloat(max)} Token`}
                fullWidth
              />
              <TextField
                className={classes.contentTextField}
                color="primary"
                label="Access"
                variant="standard"
                InputLabelProps={{
                  shrink: true
                }}
                value={selectedPool.access}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button
                className={classes.button}
                variant="outlined"
                color="inherit"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
              {poolStatus === PoolStatus.LIVE && (
                <Button
                  className={classes.button}
                  variant="contained"
                  onClick={handleOnClickSwap}
                  color="primary"
                  autoFocus
                >
                  Swap
                </Button>
              )}

              {poolStatus === PoolStatus.FILLED.FAILED && (
                <Button
                  className={classes.button}
                  variant="contained"
                  onClick={handleOnClickClaimETH}
                  color="primary"
                  autoFocus
                >
                  Claim ETH
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
                >
                  Claim Tokens
                </Button>
              )}
            </DialogActions>
          </Dialog>
        )}
      </Scrollbars>
    </div>
  );
}

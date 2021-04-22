import React, { useEffect, useState } from 'react';
import Scrollbars from 'src/components/Scrollbars';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
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
  Hidden,
  Checkbox,
  Divider,
  CircularProgress
} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getPoolList } from '../../../redux/slices/pool';
import { filter } from 'lodash';
import { closeModal, openModal } from '../../../redux/slices/pool';
import getProgressValue from '../../../utils/getProgressValue';
import { useWeb3React } from '@web3-react/core';
import StatusLabel from '../Components/StatusLabel';
import { getPoolStatus } from '../../../utils/getPoolStatus';
import Taalswap from 'src/utils/taalswap';
import Numbers from 'src/utils/Numbers';
import { targetNetwork, targetNetworkMsg } from '../../../config';
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
    width: '100px'
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

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      {/* <Hidden smDown> */}
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
      {/* </Hidden>
      <Hidden smUp>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Hidden> */}
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
  const [progressValue, setProgressValue] = useState(0);
  const [poolStatus, setStatus] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const { os, wallet, from } = useSelector((state) => state.talken);

  const { library, account } = context;

  useEffect(async () => {
    if (!!library) {
      if (
        (library.provider.isMetaMask &&
          library.provider.chainId !== targetNetwork) ||
        (!library.provider.isMetaMask &&
          library.provider.chainId !== parseInt(targetNetwork))
      ) {
        enqueueSnackbar(targetNetworkMsg, {
          variant: 'warning',
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
          }
        });
        return;
      }
    }

    if (!!library && row.contractAddress !== '') {
      const taalswap = new Taalswap({
        application: row,
        account,
        library
      });

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
    } else if (row.contractAddress !== '') {
      const taalswap = new Taalswap({
        application: row,
        notConnected: true
      });

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
    }
  }, [row, library]);

  return (
    <TableRow
      key={row.poolName}
      hover
      className={(classes.hideLastBorder, classes.row)}
      onClick={(event) => handleOpenModal(row)}
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
      {/* <TableCell align="center" width="5%"></TableCell> */}
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

export default function BasicTable({ filterName, category }) {
  const classes = useStyles();
  const history = useHistory();
  const { i18n, t } = useTranslation();

  // const [filterName, setFilterName] = useState('');
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [checkWarning, setCheckWarning] = useState(false);
  const [showWarningMessage, setShowWarningMessage] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const dispatch = useDispatch();
  const { poolList, isOpenModal, selectedPool } = useSelector(
    (state) => state.pool
  );

  useEffect(() => {
    dispatch(getPoolList());
  }, [dispatch]);

  // const handleFilterByName = (event) => {
  //   setFilterName(event.target.value);
  // };

  const handleOpenModal = (row) => {
    dispatch(openModal(row));
  };

  const handleCloseModal = () => {
    setCheckWarning(false);
    dispatch(closeModal());
  };

  const handleOnClickSwap = () => {
    if (checkWarning) {
      dispatch(closeModal());
      history.push({
        pathname: '/app/taalswap/pools/swap',
        state: { selectedPool: selectedPool }
      });
    } else {
      setShowWarningMessage(true);
    }
  };

  const handleCheckWarningChange = () => {
    setCheckWarning(!checkWarning);
    checkWarning === true
      ? setShowWarningMessage(true)
      : setShowWarningMessage(false);
  };

  const filteredPools = applyFilter(
    category === 'All'
      ? poolList.filter((pool) => pool.contractAddress !== '')
      : poolList.filter(
          (pool) => pool.contractAddress !== '' && pool.category === category
        ),
    filterName
  );

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
                    // onChangeRatioValue={onChangeRatioValue}
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
          rowsPerPageOptions={[2, 10, 25, 100]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {selectedPool && (
          <Dialog
            open={isOpenModal}
            onClose={handleCloseModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="xs"
            style={{ padding: '1rem' }}
          >
            <DialogTitle
              className={classes.dialogTitle}
              id="customized-dialog-title"
              onClose={handleCloseModal}
            >
              <Box display="flex" justifyContent="flex-start">
                <Box>
                  <ErrorOutlineOutlinedIcon style={{ color: 'red' }} />
                </Box>
                <Box marginLeft="0.5rem">
                  <Typography color="red">
                    {t('taalswap.TokenSafetyAlert')}
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>

            <DialogContent>
              <Divider />
              <Box>
                <Typography padding="0.5rem" align="justify">
                  {t('taalswap.Alert1')}
                </Typography>

                <Typography padding="0.5rem" align="justify">
                  {t('taalswap.Alert2')}
                </Typography>

                <Typography padding="0.5rem" align="justify">
                  {t('taalswap.Alert3')}
                </Typography>
              </Box>
              <Divider />
              <Box
                textAlign="right"
                // marginTop="20px"
              >
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Checkbox
                    checked={checkWarning}
                    onChange={handleCheckWarningChange}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                  <Typography
                    sx={{ cursor: 'pointer' }}
                    onClick={handleCheckWarningChange}
                  >
                    {t('taalswap.Understand')}
                  </Typography>
                </Box>
              </Box>
              {showWarningMessage === true && (
                <Box>
                  <Typography textAlign="center" color={'red'}>
                    {t('taalswap.Agree')}
                  </Typography>
                </Box>
              )}
            </DialogContent>
            <DialogActions style={{ height: '60px' }}>
              <Button
                className={classes.button}
                variant="outlined"
                color="inherit"
                onClick={handleCloseModal}
              >
                {t('taalswap.Cancel')}
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                onClick={handleOnClickSwap}
                color="primary"
                autoFocus
              >
                {t('taalswap.Proceed')}
              </Button>
            </DialogActions>
          </Dialog>
          // <Dialog
          //   open={isOpenModal}
          //   onClose={handleCloseModal}
          //   aria-labelledby="alert-dialog-title"
          //   aria-describedby="alert-dialog-description"
          // >
          //   <DialogTitle
          //     className={classes.dialogTitle}
          //     id="customized-dialog-title"
          //     onClose={handleCloseModal}
          //   >
          //     Pool Details
          //   </DialogTitle>
          //   <DialogContent dividers>
          //     <TextField
          //       className={classes.contentTextField}
          //       label="Pool"
          //       variant="standard"
          //       InputLabelProps={{
          //         shrink: true
          //       }}
          //       value={selectedPool.poolName}
          //       fullWidth
          //     />
          //     <TextField
          //       className={classes.contentTextField}
          //       label="Token"
          //       variant="standard"
          //       InputLabelProps={{
          //         shrink: true
          //       }}
          //       value={selectedPool.tokenContractAddr}
          //       fullWidth
          //     />
          //     <TextField
          //       className={classes.contentTextField}
          //       label="Max"
          //       variant="standard"
          //       InputLabelProps={{
          //         shrink: true
          //       }}
          //       value={`${getMax(
          //         selectedPool.maxIndividuals,
          //         selectedPool.tradeValue
          //       )} ETH`}
          //       fullWidth
          //     />
          //     <TextField
          //       className={classes.contentTextField}
          //       color="primary"
          //       label="Access"
          //       variant="standard"
          //       InputLabelProps={{
          //         shrink: true
          //       }}
          //       value={selectedPool.access}
          //       fullWidth
          //     />
          //   </DialogContent>
          //   <DialogActions>
          //     <Button
          //       className={classes.button}
          //       variant="outlined"
          //       color="inherit"
          //       onClick={handleCloseModal}
          //     >
          //       Cancel
          //     </Button>
          //     <Button
          //       className={classes.button}
          //       variant="contained"
          //       onClick={handleOnClickSwap}
          //       color="primary"
          //       autoFocus
          //     >
          //       Swap
          //     </Button>
          //   </DialogActions>
          // </Dialog>
        )}
      </Scrollbars>
    </div>
  );
}

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
  Box
} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getPoolList } from '../../../redux/slices/pool';
import ToolbarTable from '../../user/UserListView/ToolbarTable';
import { filter } from 'lodash';
import { closeModal, openModal } from '../../../redux/slices/pool';
import getMax from '../../../utils/getMax';
import getProgressValue from '../../../utils/getProgressValue';
import { useWeb3React } from '@web3-react/core';
import StatusLabel from '../Components/StatusLabel';
import { getPoolStatus } from '../../../utils/getPoolStatus';
import Taalswap from 'src/utils/taalswap';

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
  }
}));

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
      console.log(array);
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

  const { library, account } = context;

  useEffect(async () => {
    if (!!library && row.contractAddress !== '') {
      const taalswap = new Taalswap({
        application: row,
        account,
        library
      });

      await taalswap.tokensAllocated().then((result) => {
        setProgressValue(getProgressValue(result, row.tradeAmount));
      });

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
      className={classes.hideLastBorder}
      onClick={(event) => handleOpenModal(row)}
    >
      <TableCell component="th" scope="row" width="20%">
        {row.poolName}
      </TableCell>
      <TableCell align="right" width="20%">
        {row.ratio} {row.symbol} = 1 ETH
      </TableCell>
      <TableCell align="right" width="10%">
        {row.access}
      </TableCell>
      {/* <TableCell align="center" width="5%"></TableCell> */}
      <TableCell align="right" width="35%">
        <LinearProgressWithLabel value={progressValue} />
      </TableCell>
      <TableCell align="right" width="15%">
        <StatusLabel poolStatus={poolStatus} />
      </TableCell>
    </TableRow>
  );
}

export default function BasicTable() {
  const classes = useStyles();
  const history = useHistory();

  const [filterName, setFilterName] = useState('');
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleOpenModal = (row) => {
    dispatch(openModal(row));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleOnClickSwap = () => {
    dispatch(closeModal());
    history.push({
      pathname: '/app/taalswap/swap',
      state: { selectedPool: selectedPool }
    });
  };

  const filteredPools = applyFilter(
    poolList.filter((pool) => pool.contractAddress !== ''),
    filterName
  );

  return (
    <div className={classes.root}>
      <ToolbarTable filterName={filterName} onFilterName={handleFilterByName} />
      <Scrollbars>
        <TableContainer sx={{ minWidth: 800, mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell component="th">
                  <Typography variant="h6" gutterBottom>
                    Project Name
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6" gutterBottom>
                    Ratio
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6" gutterBottom>
                    Access
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6" gutterBottom>
                    Progress
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6" gutterBottom>
                    Status
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPools.map((row, index) => (
                <TablePoolRow
                  key={index}
                  row={row}
                  handleOpenModal={handleOpenModal}
                  // onChangeRatioValue={onChangeRatioValue}
                />
              ))}
              {/* {filteredPools.map((row, index) => (
                <TableRow
                  key={index}
                  hover
                  className={classes.hideLastBorder}
                  onClick={(event) => handleOpenModal(row)}
                >
                  <TableCell component="th" scope="row" width="20%">
                    {row.poolName}
                  </TableCell>
                  <TableCell align="right" width="10%">
                    {row.ratio}
                  </TableCell>
                  <TableCell align="right" width="15%">
                    {row.access}
                  </TableCell>
                  <TableCell align="right" width="35%">

                    <LinearProgressWithLabel
                      value={
                        row.progress === '' || row.progress >= 100
                          ? 100
                          : row.progress

                      }
                    />
                  </TableCell>
                  <TableCell align="right" width="15%">
                    <MLabel
                      variant={
                        theme.palette.mode === 'light' ? 'ghost' : 'filled'
                      }
                      color={
                        (row.status === 'in_progress' && 'warning') ||
                        (row.status === 'out_of_date' && 'error') ||
                        'success'
                      }
                    >
                      {sentenceCase(row.status)}
                    </MLabel>
                  </TableCell>
                </TableRow>
              ))} */}
            </TableBody>
          </Table>
        </TableContainer>
        {/*
        <DialogAnimate open={isOpenModal}>
          <DialogTitle>{'Pool Details'}</DialogTitle>
          <DetailsForm
            pool={selectedPool}
            onCancel={handleCloseModal}
            onClickSwap={handleOnClickSwap}
          />
        </DialogAnimate> */}

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
                label="Token"
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
                value={`${getMax(
                  selectedPool.maxIndividuals,
                  selectedPool.tradeValue
                )} ETH`}
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
              <Button
                className={classes.button}
                variant="contained"
                onClick={handleOnClickSwap}
                color="primary"
                autoFocus
              >
                Swap
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Scrollbars>
      <TablePagination
        page={page}
        component="div"
        count={BasicTable.length}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[10, 25, 100]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

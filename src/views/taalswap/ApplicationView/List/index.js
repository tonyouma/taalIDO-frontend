import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import {
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TablePagination,
  TextField,
  Backdrop,
  Tooltip,
  IconButton,
  Checkbox,
  Typography,
  Toolbar,
  TableSortLabel,
  TableRow,
  CircularProgress,
  Box,
  Hidden
} from '@material-ui/core';
import {
  updateApplication,
  getApplicationList,
  searchApplicationListByCreator,
  openModal,
  closeModal
} from 'src/redux/slices/pool';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import EditIcon from '@material-ui/icons/Edit';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { admin, targetNetwork, targetNetworkMsg } from 'src/config';
import Numbers from 'src/utils/Numbers';
import { ContractFactory } from '@ethersproject/contracts';
import { fixedData } from 'src/contracts';
import Page from 'src/components/Page';
import { HeaderDashboard } from 'src/layouts/Common';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import ToolbarTable from '../../../user/UserListView/ToolbarTable';
import { filter } from 'lodash';
import { PoolStatus } from 'src/utils/poolStatus';
import { login } from 'src/utils/auth';

import StatusLabel from '../../Components/StatusLabel';
import './APP.css';
import { styles } from '@material-ui/lab/PickersDay/PickersDay';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

async function deployFixedSwap(application, account, library) {
  // console.log('application : ' + JSON.stringify(application));
  // console.log('account : ' + account);
  // console.log('library : ' + library);

  const factory = new ContractFactory(
    fixedData.abi,
    fixedData.bytecode,
    library.getSigner(account)
  );

  return await taalDeploy(factory, application);
}

async function taalDeploy(factory, application) {
  // console.log('taalDeploy start!');
  const ret = {};
  const contract = await factory
    .deploy(
      application.tokenContractAddr,
      Numbers.toSmartContractDecimals(
        application.tradeValue,
        application.decimals
      ) /* to wei */,
      Numbers.toSmartContractDecimals(
        application.tradeAmount,
        application.decimals
      ),
      application.startDate,
      application.endDate,
      Numbers.toSmartContractDecimals(
        application.minIndividuals,
        application.decimals
      ),
      Numbers.toSmartContractDecimals(
        application.maxIndividuals,
        application.decimals
      ),
      application.atomic,
      Numbers.toSmartContractDecimals(
        application.minFundRaise,
        application.decimals
      ),
      application.feeAmount,
      application.access === 'Private' ? true : false,
      {
        gasLimit: 7000000
      }
    )
    .catch(function (err) {
      // console.log(err);
      ret.err = err;
    });

  if (!!ret.err) return ret;

  // console.log('test========');
  const receipt = await contract.deployTransaction.wait().catch(function (err) {
    // console.log(err);
    ret.err = err;
  });
  if (!!ret.err) return ret;
  const { confirmations } = receipt;
  ret.confirmations = confirmations;
  if (confirmations === 1) {
    // console.log('fixedSwap contract deploy... confirmed!!');
    const { address } = contract;
    ret.address = address;
  } else {
    console.log(JSON.stringify(receipt));
  }
  return ret;
}

// const headCells = [
// {
//   id: 'projectName',
//   numeric: false,
//   disablePadding: true,
//   align: false,
//   label: 'Project'
// },
// {
//   id: 'category',
//   numeric: false,
//   disablePadding: false,
//   align: true,
//   label: 'Category'
// },
// {
//   id: 'startDate',
//   numeric: false,
//   disablePadding: false,
//   align: true,
//   label: 'Start Date'
// },
// {
//   id: 'endDate',
//   numeric: false,
//   disablePadding: false,
//   align: true,
//   label: 'End Date'
// },
// {
//   id: 'status',
//   numeric: false,
//   disablePadding: false,
//   align: true,
//   label: 'Status'
// }
// ];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        <TableCell
          key="projectName"
          align="left"
          padding="none"
          sortDirection={orderBy === 'projectName' ? order : false}
        >
          <TableSortLabel
            active={orderBy === 'projectName'}
            direction={orderBy === 'projectName' ? order : 'asc'}
            onClick={createSortHandler('projectName')}
          >
            <Typography variant="h6" gutterBottom>
              Project
            </Typography>
            {orderBy === 'Project' ? (
              <span className={classes.visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </span>
            ) : null}
          </TableSortLabel>
        </TableCell>

        <Hidden smDown>
          <TableCell
            key="category"
            align="right"
            padding="default"
            sortDirection={orderBy === 'category' ? order : false}
          >
            <TableSortLabel
              active={orderBy === 'category'}
              direction={orderBy === 'category' ? order : 'asc'}
              onClick={createSortHandler('category')}
            >
              <Typography variant="h6" gutterBottom>
                Category
              </Typography>
              {orderBy === 'Category' ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        </Hidden>
        <TableCell
          key="startDate"
          align="right"
          padding="default"
          className={classes.tableDateCell}
          sortDirection={orderBy === 'startDate' ? order : false}
        >
          <TableSortLabel
            active={orderBy === 'startDate'}
            direction={orderBy === 'startDate' ? order : 'asc'}
            onClick={createSortHandler('startDate')}
          >
            <Typography variant="h6" gutterBottom>
              Start Date
            </Typography>
            {orderBy === 'startDate' ? (
              <span className={classes.visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </span>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <Hidden smDown>
          <TableCell
            key="endDate"
            align="right"
            padding="default"
            className={classes.tableDateCell}
            sortDirection={orderBy === 'endDate' ? order : false}
          >
            <TableSortLabel
              active={orderBy === 'endDate'}
              direction={orderBy === 'endDate' ? order : 'asc'}
              onClick={createSortHandler('endDate')}
            >
              <Typography variant="h6" gutterBottom>
                End Date
              </Typography>
              {orderBy === 'endDate' ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        </Hidden>
        <TableCell
          key="status"
          align="right"
          padding="default"
          sortDirection={orderBy === 'status' ? order : false}
        >
          <TableSortLabel
            active={orderBy === 'status'}
            direction={orderBy === 'status' ? order : 'asc'}
            onClick={createSortHandler('status')}
          >
            <Typography variant="h6" gutterBottom>
              Status
            </Typography>
            {orderBy === 'status' ? (
              <span className={classes.visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </span>
            ) : null}
          </TableSortLabel>
        </TableCell>
        {/*
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography variant="h6" gutterBottom>
                {headCell.label}
              </Typography>
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))} */}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  // numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  // onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main
        }
      : {
          color: theme.palette.text.primary
        },
  title: {
    flex: '1 1 100%'
  }
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const {
    selected,
    selectedItem,
    onClickDeploy,
    onClickAdmin,
    onClickEdit,
    onClickSend,
    checkAdmin,
    account
  } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: selected !== null
      })}
    >
      {selected !== -1 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          1 selected
        </Typography>
      ) : (
        ''
      )}

      {selected !== -1 ? (
        <div style={{ display: 'flex' }}>
          {selectedItem.status === PoolStatus.APPROVED &&
          selectedItem.creator === account ? (
            <Tooltip title="Deploy">
              <IconButton aria-label="Deploy" onClick={onClickDeploy}>
                <CloudUploadIcon />
              </IconButton>
            </Tooltip>
          ) : (
            ''
          )}
          {selectedItem.status === PoolStatus.CANDIDATE && checkAdmin() ? (
            <Tooltip title="Approve">
              <IconButton aria-label="Approve" onClick={onClickSend}>
                <AssignmentTurnedInIcon />
              </IconButton>
            </Tooltip>
          ) : (
            ''
          )}
          {selectedItem.creator === account || checkAdmin() ? (
            <Tooltip title="Edit">
              <IconButton aria-label="Edit" onClick={onClickEdit}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          ) : (
            ''
          )}
          {(selectedItem.creator === account || checkAdmin()) &&
          selectedItem.status !== PoolStatus.CANDIDATE &&
          selectedItem.status !== PoolStatus.APPROVED ? (
            <Tooltip title="Admin">
              <IconButton aria-label="Admin" onClick={onClickAdmin}>
                <SupervisorAccountIcon />
              </IconButton>
            </Tooltip>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  // numSelected: PropTypes.number.isRequired,
  selected: PropTypes.number.isRequired
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    // minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },
  row: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  tableTop: {
    display: 'flex',
    justifyContent: 'space-between',
    // alignItems: 'center',
    height: '70px'
  },
  tableTab: { width: '100%' },
  tableSearch: { width: '320px', textAlign: 'right' },
  tableDateCell: {
    minWidth: '160px'
  }
}));

// ----------------------------------------------------------------------

function applyFilter(array, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  if (query) {
    array = filter(array, (_user) => {
      // console.log(array);
      return _user.poolName.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    return array;
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ApplicationListView() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [open, setOpen] = React.useState(false);
  const [orderBy, setOrderBy] = React.useState('name');
  const [modalType, setModalType] = React.useState('');
  const [selected, setSelected] = React.useState(-1);
  const [selectedItem, setSelectedItem] = React.useState({});
  const dispatch = useDispatch();
  const { applicationList, isOpenModal, update } = useSelector(
    (state) => state.pool
  );
  const [page, setPage] = useState(0);
  const [secret, setSecret] = React.useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const context = useWeb3React();
  const { account, library } = context;
  const [inputs, setInputs] = useState({
    password: ''
  });
  const [filterName, setFilterName] = useState('');

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleOpenModal = (row, type) => {
    setModalType(type);
    setSecret('');
    dispatch(openModal(row));
  };

  const handleCloseModal = () => {
    setModalType('');
    setSecret('');
    dispatch(closeModal());
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const checkAdmin = () => {
    // console.log('isAdmin : ' + admin.addresses.includes(account));
    return admin.addresses.includes(account);
  };

  const handleClickAdmin = async () => {
    // console.log(`admin item index :  ${selected}`);
    handleOpenModal(selectedItem, 'admin');
  };

  const handleConfirmClick = async () => {
    const isAdmin = checkAdmin();
    if (secret.trim().length === 0) {
      enqueueSnackbar('password를 입력하세요.', { variant: 'fail' });
      return;
    }

    // 패스워드 체크가 들어가야 한다. /login 호출 jwt token 을 받아서 인증에 사용한다.
    let isError = false;
    const ret = await login({
      creator: account,
      password: isAdmin ? '1234' : secret,
      key: isAdmin ? selectedItem.userId : selectedItem.id
    }).catch((error) => {
      enqueueSnackbar('인증에 실패하였습니다.', { variant: 'fail' });
      isError = true;
    });
    if (isError) return;
    // console.log(ret);
    const { accessToken, userId } = ret;
    handleCloseModal();
    if (modalType === 'admin') {
      history.push({
        pathname: '/app/taalswap/application/admin',
        state: { selectedItem: selectedItem, accessToken: accessToken, userId }
      });
    } else if (modalType === 'deploy') {
      setOpen(true);
      const item = JSON.parse(JSON.stringify(selectedItem));
      const ret = await deployFixedSwap(item, account, library);
      if (!!ret.err) {
        // console.log('error');
        enqueueSnackbar('Application Deploy fail', { variant: 'fail' });
      } else {
        dispatch(
          updateApplication(
            selectedItem.id,
            {
              status: PoolStatus.DEPLOYED,
              contractAddress: ret.address,
              userId: userId
            },
            accessToken
          )
        );
        // console.log('deploy success.');
        enqueueSnackbar('Application Deploy success', { variant: 'success' });
        setSelected(-1);
      }
    }
    setOpen(false);
  };

  const handleClickEdit = () => {
    // console.log(`edit item index :  ${selected}`);
    history.push({
      pathname: '/app/taalswap/application/start',
      state: { selectedItem: selectedItem }
    });
  };

  const handleClickSend = async () => {
    // console.log(`send item index : ${selected}`);
    const ret = await login({
      creator: account,
      password: '12345678',
      key: selectedItem.userId
    });

    // console.log('========', ret);
    const { accessToken, userId } = ret;
    // 상태를 승인상태로 변경해준다.
    dispatch(
      updateApplication(
        selectedItem.id,
        { status: PoolStatus.APPROVED, userId: userId },
        accessToken
      )
    );
    enqueueSnackbar('Application approved', { variant: 'success' });
    setSelected(-1);
  };

  const handleClickDeploy = async () => {
    // console.log(`deploy item index : ${selected}`);
    handleOpenModal(selectedItem, 'deploy');
  };

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
    if (account && checkAdmin(account)) {
      dispatch(getApplicationList());
    } else if (account) {
      dispatch(searchApplicationListByCreator(account));
    }
  }, [update, open, library]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, row) => {
    // console.log('row : ' + JSON.stringify(row));
    if (selected === row.id) {
      setSelected(-1);
      setSelectedItem({});
    } else {
      setSelected(row.id);
      setSelectedItem(row);
    }
  };

  const onChange = (e) => {
    const { value } = e.target;
    setSecret(value);
  };

  const onClickApllyForIdo = () => {
    history.push('/app/taalswap/application/information');
  };

  const isSelected = (index) => (selected !== index ? false : true);
  const { i18n, t } = useTranslation();

  const filteredApplications = applyFilter(applicationList, filterName);

  return (
    <Page title={t('taalswap.applications')} className={classes.root}>
      <Container maxWidth="lg">
        {/* <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop> */}
        <Backdrop
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column'
          }}
          className={classes.backdrop}
          open={open}
        >
          <Box>
            <CircularProgress color="inherit" />
          </Box>
          <Box>
            <Typography>In progress… Please wait.</Typography>
          </Box>
        </Backdrop>
        <Box className={classes.tableTop}>
          <Box className={classes.tableTab} className="tab_Line">
            <HeaderDashboard
              className="apply_icon3123"
              heading={t('taalswap.applications')}
              links={[{ name: '' }]}
            />
            <Tooltip title="apply for IDO">
              <Box
                className="apply_icon"
                component="img"
                src={`/static/icons/ic_write_25.png`}
                sx={{
                  width: 25,
                  height: 25
                }}
                onClick={onClickApllyForIdo}
              />
            </Tooltip>
          </Box>
          <Box className={classes.tableSearch} className="apply_searchbox">
            <ToolbarTable
              filterName={filterName}
              onFilterName={handleFilterByName}
            />
          </Box>
        </Box>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Card>
              {selected !== -1 ? (
                <EnhancedTableToolbar
                  selected={selected}
                  selectedItem={selectedItem}
                  onClickAdmin={handleClickAdmin}
                  onClickSend={handleClickSend}
                  onClickDeploy={handleClickDeploy}
                  onClickEdit={handleClickEdit}
                  checkAdmin={checkAdmin}
                  account={account}
                />
              ) : (
                <div className={classes.paper}></div>
              )}

              <TableContainer>
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  aria-label="enhanced table"
                >
                  <EnhancedTableHead
                    classes={classes}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={filteredApplications.length}
                  />
                  <TableBody>
                    {stableSort(
                      filteredApplications,
                      getComparator(order, orderBy)
                    )
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.id);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                          <TableRow
                            className={classes.row}
                            hover
                            onClick={(event) => handleClick(event, row)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
                            selected={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                inputProps={{ 'aria-labelledby': labelId }}
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              {row.projectName}
                            </TableCell>
                            <Hidden smDown>
                              <TableCell align="right">
                                {row.category}
                              </TableCell>
                            </Hidden>
                            <TableCell align="right">
                              {moment.unix(row.startDate).format('YYYY-MM-DD')}
                            </TableCell>
                            <Hidden smDown>
                              <TableCell align="right">
                                {moment.unix(row.endDate).format('YYYY-MM-DD')}
                              </TableCell>
                            </Hidden>
                            <TableCell align="right">
                              <StatusLabel
                                poolStatus={
                                  row.status === PoolStatus.UPCOMING
                                    ? 'Ready'
                                    : row.status
                                }
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                page={page}
                component="div"
                count={filteredApplications.length}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[10, 25, 100]}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
            {/* <div align="right">
              {' '}
              <Button
                to="/app/taalswap/application/information"
                variant="contained"
                component={RouterLink}
                sx={{ marginTop: 3, marginRight: 3 }}
              >
                apply for IDO
              </Button>
            </div> */}
          </Grid>
        </Grid>
        {isSelected && (
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
              Password
            </DialogTitle>
            <DialogContent dividers>
              <TextField
                className={classes.contentTextField}
                name="password"
                type="password"
                variant="standard"
                onChange={onChange}
                value={secret}
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
                onClick={handleConfirmClick}
                color="primary"
                autoFocus
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Container>
    </Page>
  );
}

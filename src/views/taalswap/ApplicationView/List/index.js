import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import { updateApplication, getApplicationList } from 'src/redux/slices/pool';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  Button,
  Card,
  Container,
  Grid,
  TablePagination
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { admin } from 'src/config';
import Numbers from 'taalswap-js/src/utils/Numbers';
import { ContractFactory } from '@ethersproject/contracts';
import { fixedData } from 'src/contracts';
import Page from '../../../../components/Page';
import { HeaderDashboard } from '../../../../layouts/Common';
import BasicTable from '../../PoolListView/BasicTable';

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
  console.log('application : ' + JSON.stringify(application));
  console.log('account : ' + account);
  console.log('library : ' + library);

  const factory = new ContractFactory(
    fixedData.abi,
    fixedData.bytecode,
    library.getSigner(account)
  );

  return await taalDeploy(factory, application);
}

async function taalDeploy(factory, application) {
  console.log('taalDeploy start!');
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
      parseInt('10'),
      application.access === 'private' ? true : false,
      {
        gasLimit: 7000000
      }
    )
    .catch(function (err) {
      console.log(err);
      ret.err = err;
    });

  if (!!ret.err) return ret;

  console.log('test========');
  const receipt = await contract.deployTransaction.wait().catch(function (err) {
    console.log(err);
    ret.err = err;
  });
  if (!!ret.err) return ret;
  const { confirmations } = receipt;
  ret.confirmations = confirmations;
  if (confirmations === 1) {
    console.log('fixedSwap contract deploy... confirmed!!');
    const { address } = contract;
    ret.address = address;
  } else {
    console.log(JSON.stringify(receipt));
  }
  return ret;
}

const headCells = [
  {
    id: 'projectName',
    numeric: false,
    disablePadding: true,
    label: 'Name'
  },
  { id: 'category', numeric: false, disablePadding: false, label: 'Category' },
  {
    id: 'startDate',
    numeric: false,
    disablePadding: false,
    label: 'Start Date'
  },
  { id: 'endDate', numeric: false, disablePadding: false, label: 'End Date' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' }
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
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
  const { selected, selectedItem } = props;
  const dispatch = useDispatch();
  const context = useWeb3React();
  const { account, library } = context;

  const onClickEdit = () => {
    console.log(`edit item index :  ${selected}`);
  };

  const onClickSend = () => {
    console.log(`send item index : ${selected}`);
    // 상태를 승인상태로 변경해준다.
    const item = JSON.parse(JSON.stringify(selectedItem));
    item.status = 'approved';
    dispatch(updateApplication(item));
  };

  const onClickDeploy = async () => {
    console.log(`deploy item index : ${selected}`);
    const item = JSON.parse(JSON.stringify(selectedItem));
    const ret = await deployFixedSwap(item, account, library);
    if (!!ret.err) {
      console.log('error');
    } else {
      item.status = 'deployed';
      item.contractAddress = ret.address;
      dispatch(updateApplication(item));
      console.log('deploy success.');
    }
  };

  const checkAdmin = () => {
    console.log('isAdmin' + admin.addresses.includes(account));
    return admin.addresses.includes(account);
  };

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
          {selectedItem.status === 'approved' &&
          selectedItem.creator === account ? (
            <Tooltip title="Deploy">
              <IconButton aria-label="Send" onClick={onClickDeploy}>
                <CloudUploadIcon />
              </IconButton>
            </Tooltip>
          ) : (
            ''
          )}
          {selectedItem.status === 'candidate' && checkAdmin() ? (
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
    minWidth: 750
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
  }
}));

export default function ApplicationListView() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState(-1);
  const [selectedItem, setSelectedItem] = React.useState({});
  const dispatch = useDispatch();
  const { applicationList } = useSelector((state) => state.pool);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    console.log(applicationList);
    dispatch(getApplicationList());
  }, [dispatch]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, row) => {
    console.log('row : ' + JSON.stringify(row));
    if (selected === row.id) {
      setSelected(-1);
      setSelectedItem({});
    } else {
      setSelected(row.id);
      setSelectedItem(row);
    }
  };

  const isSelected = (index) => (selected !== index ? false : true);

  return (
    <Page title="Application List" className={classes.root}>
      <Container maxWidth="lg">
        <HeaderDashboard heading="Application List" links={[{ name: '' }]} />
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Card>
              {selected !== -1 ? (
                <EnhancedTableToolbar
                  selected={selected}
                  selectedItem={selectedItem}
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
                    rowCount={applicationList.length}
                  />
                  <TableBody>
                    {stableSort(
                      applicationList,
                      getComparator(order, orderBy)
                    ).map((row, index) => {
                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow
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
                          <TableCell align="right">{row.category}</TableCell>
                          <TableCell align="right">
                            {moment.unix(row.startDate).format('YYYY-MM-DD')}
                          </TableCell>
                          <TableCell align="right">
                            {moment.unix(row.endDate).format('YYYY-MM-DD')}
                          </TableCell>
                          <TableCell align="right">{row.status}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                page={page}
                component="div"
                count={BasicTable.length}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[10, 25, 100]}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
            <div align="right">
              {' '}
              <Button
                to="/app/taalswap/application/information"
                variant="contained"
                component={RouterLink}
                sx={{ marginTop: 3, marginRight: 3 }}
              >
                apply for IDO
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

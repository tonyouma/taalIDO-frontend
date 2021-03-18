import { filter } from 'lodash';
import HeadTable from './HeadTable';
import { Icon } from '@iconify/react';
import Page from 'src/components/Page';
import ToolbarTable from './ToolbarTable';
import { sentenceCase } from 'change-case';
import { PATH_APP } from 'src/routes/paths';
import { fDate } from 'src/utils/formatTime';
import LazySize from 'src/components/LazySize';
import { fCurrency } from 'src/utils/formatNumber';
import React, { useState, useEffect } from 'react';
import Scrollbars from 'src/components/Scrollbars';
import { visuallyHidden } from '@material-ui/utils';
import { HeaderDashboard } from 'src/layouts/Common';
import { getProducts } from 'src/redux/slices/product';
import { useDispatch, useSelector } from 'react-redux';
import SearchNotFound from 'src/components/SearchNotFound';
import moreVerticalFill from '@iconify-icons/eva/more-vertical-fill';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Table,
  TableRow,
  Checkbox,
  TableBody,
  TableCell,
  Container,
  IconButton,
  Typography,
  TableContainer,
  TablePagination
} from '@material-ui/core';
import { MLabel } from 'src/theme';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Product', alignRight: false },
  { id: 'createdAt', label: 'Create at', alignRight: false },
  { id: 'inventoryType', label: 'Status', alignRight: false },
  { id: 'price', label: 'Price', alignRight: true },
  { id: '' }
];
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

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (query) {
    array = filter(array, (_product) => {
      return _product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    return array;
  }
  return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
  root: {},
  sortSpan: visuallyHidden
}));

// ----------------------------------------------------------------------

function ProductListView() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('createdAt');

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = products.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  const filteredProducts = applySortFilter(
    products,
    getComparator(order, orderBy),
    filterName
  );

  const isProductNotFound = filteredProducts.length === 0;

  return (
    <Page
      title="Product List-Ecommerce-Management | Minimal-UI"
      className={classes.root}
    >
      <Container>
        <HeaderDashboard
          heading="Product List"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Management', href: PATH_APP.management.root },
            { name: 'E-Commerce', href: PATH_APP.management.eCommerce.root },
            { name: 'Product List' }
          ]}
        />

        <Card className={classes.card}>
          <ToolbarTable
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbars>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <HeadTable
                  order={order}
                  classes={classes}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={products.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredProducts
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const {
                        id,
                        name,
                        cover,
                        price,
                        createdAt,
                        inventoryType
                      } = row;

                      const isItemSelected = selected.indexOf(name) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                          onClick={(event) => handleClick(event, name)}
                          className={classes.row}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox checked={isItemSelected} />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Box
                              sx={{
                                py: 2,
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <LazySize
                                alt={name}
                                src={cover.thumb}
                                sx={{
                                  mx: 2,
                                  width: 64,
                                  height: 64,
                                  borderRadius: 1.5
                                }}
                              />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell style={{ minWidth: 160 }}>
                            {fDate(createdAt)}
                          </TableCell>
                          <TableCell style={{ minWidth: 160 }}>
                            <MLabel
                              variant={
                                theme.palette.mode === 'light'
                                  ? 'ghost'
                                  : 'filled'
                              }
                              color={
                                (inventoryType === 'out_of_stock' && 'error') ||
                                (inventoryType === 'low_stock' && 'warning') ||
                                'success'
                              }
                            >
                              {sentenceCase(inventoryType)}
                            </MLabel>
                          </TableCell>
                          <TableCell align="right">
                            {fCurrency(price)}
                          </TableCell>
                          <TableCell align="right">
                            <IconButton>
                              <Icon
                                icon={moreVerticalFill}
                                width={20}
                                height={20}
                              />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isProductNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6}>
                        <Box sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbars>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}

export default ProductListView;

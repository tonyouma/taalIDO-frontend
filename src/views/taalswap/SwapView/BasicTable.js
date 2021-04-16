import React, { useState, useEffect } from 'react';
import Scrollbars from 'src/components/Scrollbars';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Numbers from 'src/utils/Numbers';
import {
  Box,
  Hidden,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const useStyles = makeStyles({
  root: {},
  row: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
});

// ----------------------------------------------------------------------

export default function BasicTable({ purchaseList, symbol }) {
  const classes = useStyles();
  const { i18n, t } = useTranslation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function date_ascending(a, b) {
    var dateA = new Date(a['timestamp']).getTime();
    var dateB = new Date(b['timestamp']).getTime();
    return dateA < dateB ? 1 : -1;
  }

  useEffect(() => {
    if (purchaseList.length > 0) {
      // purchaseList.sort(date_ascending);

      console.log(purchaseList.sort(date_ascending));
    }
  }, []);
  return (
    <div className={classes.root}>
      <Scrollbars>
        <TableContainer sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <Hidden smDown>
                  <TableCell>{t('taalswap.Purchaser')}</TableCell>
                </Hidden>
                <TableCell align="right">
                  {symbol} {t('taalswap.Amount')}
                </TableCell>
                <TableCell align="right">Eth {t('taalswap.Amount')}</TableCell>

                <TableCell align="center">{t('taalswap.Timestamp')}</TableCell>
                <Hidden smDown>
                  <TableCell align="center">
                    {t('taalswap.Finalized')}
                  </TableCell>
                </Hidden>
              </TableRow>
            </TableHead>
            <TableBody>
              {purchaseList.length > 0 &&
                purchaseList
                  .sort(date_ascending)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow
                      key={index}
                      className={(classes.hideLastBorder, classes.row)}
                    >
                      <Hidden smDown>
                        <TableCell component="th" scope="row">
                          {row.purchaser}
                        </TableCell>
                      </Hidden>
                      <TableCell align="right">
                        {Numbers.toFloat(row.amount)}
                      </TableCell>
                      <TableCell align="right">
                        {Numbers.toFloat(row.ethAmount)}
                      </TableCell>

                      <TableCell align="right">{row.timestamp}</TableCell>
                      <Hidden smDown>
                        <TableCell align="center" width="10%">
                          {row.wasFinalized.toString()}
                        </TableCell>
                      </Hidden>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbars>
      <TablePagination
        page={page}
        component="div"
        count={purchaseList.length}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[10, 25, 100]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import Scrollbars from 'src/components/Scrollbars';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

import {
  Box,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination
} from '@material-ui/core';

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

export default function BasicTable({ purchaseList }) {
  const classes = useStyles();
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
        <TableContainer sx={{ minWidth: 800, mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Purchaser</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">ethAmount</TableCell>
                <TableCell align="center">timestamp</TableCell>
                <TableCell align="center">wasFinalized</TableCell>
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
                      <TableCell component="th" scope="row">
                        {row.purchaser}
                      </TableCell>
                      <TableCell align="right">{row.amount}</TableCell>
                      <TableCell align="right">{row.ethAmount}</TableCell>
                      <TableCell align="right">{row.timestamp}</TableCell>
                      <TableCell align="center" width="10%">
                        {row.wasFinalized.toString()}
                      </TableCell>
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

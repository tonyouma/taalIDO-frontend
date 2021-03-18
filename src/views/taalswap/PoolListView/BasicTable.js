import React, { useEffect, useState } from 'react';
import Scrollbars from 'src/components/Scrollbars';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  Slider
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getPoolList } from '../../../redux/slices/pool';
import ToolbarTable from '../../user/UserListView/ToolbarTable';
import { filter } from 'lodash';

// ----------------------------------------------------------------------

const useStyles = makeStyles({
  root: {}
});

function valueText(value) {
  return `${value}%`;
}

const marks = [
  {
    value: 0,
    label: '0°C'
  },
  {
    value: 20,
    label: '20%'
  },
  {
    value: 40,
    label: '40%'
  },
  {
    value: 60,
    label: '60%'
  },
  {
    value: 80,
    label: '80%'
  },
  {
    value: 100,
    label: '100%'
  }
];

// ----------------------------------------------------------------------

function applyFilter(array, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  if (query) {
    array = filter(array, (_user) => {
      return _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    return array;
  }
  return stabilizedThis.map((el) => el[0]);
}

// ----------------------------------------------------------------------

export default function BasicTable() {
  const classes = useStyles();
  const [filterName, setFilterName] = useState('');

  const dispatch = useDispatch();
  const { poolList } = useSelector((state) => state.pool);

  useEffect(() => {
    dispatch(getPoolList());
  }, [dispatch]);
  console.log(poolList);

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleClick = (event, name) => {
    console.log(name);
  };

  const filteredPools = applyFilter(poolList, filterName);

  return (
    <div className={classes.root}>
      <ToolbarTable filterName={filterName} onFilterName={handleFilterByName} />
      <Scrollbars>
        <TableContainer sx={{ minWidth: 800, mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Pool Name</TableCell>
                <TableCell align="right">Ratio</TableCell>
                <TableCell align="right">Access</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">Progress</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPools.map((row) => (
                <TableRow
                  key={row.name}
                  hover
                  className={classes.hideLastBorder}
                  onClick={(event) => handleClick(event, row.name)}
                >
                  <TableCell component="th" scope="row" width="15%">
                    {row.name}
                  </TableCell>
                  <TableCell align="right" width="10%">
                    {row.ratio}
                  </TableCell>
                  <TableCell align="right" width="10%">
                    {row.access}
                  </TableCell>
                  <TableCell align="right" width="5%"></TableCell>
                  <TableCell align="right" width="40%">
                    <Slider
                      marks={marks}
                      step={10}
                      min={0}
                      max={100}
                      defaultValue={0}
                      value={row.progress}
                      valueLabelDisplay="auto"
                      getAriaValueText={valueText}
                    />
                  </TableCell>
                  <TableCell align="left" width="20%">
                    {row.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbars>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import Scrollbars from 'src/components/Scrollbars';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  Slider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getPoolList } from '../../../redux/slices/pool';
import ToolbarTable from '../../user/UserListView/ToolbarTable';
import { filter } from 'lodash';
import { DialogAnimate } from '../../../components/Animate';
import DetailsForm from './DetailsForm';
import { closeModal, openModal } from '../../../redux/slices/pool';

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

function valueText(value) {
  const returnValue = `${value}%`;
  console.log(returnValue);
  return returnValue;
}

const marks = [
  {
    value: 0,
    label: '0%'
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
  const history = useHistory();
  const [filterName, setFilterName] = useState('');

  const dispatch = useDispatch();
  const { poolList, isOpenModal, selectedPool } = useSelector(
    (state) => state.pool
  );

  useEffect(() => {
    console.log(poolList);
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
                  onClick={(event) => handleOpenModal(row)}
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
            // maxWidth="lg"
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
                value={selectedPool.name}
                fullWidth
              />
              <TextField
                className={classes.contentTextField}
                label="Token"
                variant="standard"
                InputLabelProps={{
                  shrink: true
                }}
                value={selectedPool.address}
                fullWidth
              />
              <TextField
                className={classes.contentTextField}
                label="Max"
                variant="standard"
                InputLabelProps={{
                  shrink: true
                }}
                value={`${selectedPool.max} Token`}
                fullWidth
              />
              <TextField
                className={classes.contentTextField}
                color="primary"
                label="Whitelisted"
                variant="standard"
                InputLabelProps={{
                  shrink: true
                }}
                value={selectedPool.whitelist}
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
    </div>
  );
}

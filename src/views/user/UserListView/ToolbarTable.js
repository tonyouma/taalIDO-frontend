import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import searchFill from '@iconify-icons/eva/search-fill';
import trash2Fill from '@iconify-icons/eva/trash-2-fill';
import roundFilterList from '@iconify-icons/ic/round-filter-list';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => {
  const isLight = theme.palette.mode === 'light';
  return {
    root: {
      height: 40,
      display: 'flex',
      justifyContent: 'space-between',
      padding: theme.spacing(0, 0, 0, 0)
    },
    highlight: isLight
      ? {
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.primary.lighter
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.primary.dark
        }
  };
});

// ----------------------------------------------------------------------

ToolbarTable.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  className: PropTypes.string
};

function ToolbarTable({ numSelected, filterName, onFilterName, className }) {
  const classes = useStyles();

  return (
    <Toolbar
      className={clsx(
        classes.root,
        { [classes.highlight]: numSelected > 0 },
        className
      )}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <OutlinedInput
          value={filterName}
          size={'small'}
          onChange={onFilterName}
          placeholder="Search by Project Name..."
          startAdornment={
            <InputAdornment position="start">
              <Box
                component={Icon}
                icon={searchFill}
                sx={{ color: 'text.disabled' }}
              />
            </InputAdornment>
          }
          className={classes.search}
        />
      )}
      {/*
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Icon icon={trash2Fill} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <Icon icon={roundFilterList} />
          </IconButton>
        </Tooltip>
      )} */}
    </Toolbar>
  );
}

export default ToolbarTable;

import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import searchFill from '@iconify-icons/eva/search-fill';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  FormControl,
  OutlinedInput,
  InputAdornment,
  ClickAwayListener
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: { marginTop: theme.spacing(2) },
  search: {
    transition: theme.transitions.create('box-shadow', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter
    }),
    '&.Mui-focused': { boxShadow: theme.shadows[25].z8 },
    '& fieldset': {
      borderWidth: `1px !important`,
      borderColor: `${theme.palette.grey[500_32]} !important`
    }
  }
}));

// ----------------------------------------------------------------------

Search.propTypes = {
  query: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onClickAway: PropTypes.func,
  className: PropTypes.string
};

function Search({ query, onChange, onFocus, onClickAway, className }) {
  const classes = useStyles();

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <div className={clsx(classes.root, className)}>
        <FormControl fullWidth size="small">
          <OutlinedInput
            value={query}
            onFocus={onFocus}
            onChange={onChange}
            placeholder="Search contacts..."
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
        </FormControl>
      </div>
    </ClickAwayListener>
  );
}

export default Search;

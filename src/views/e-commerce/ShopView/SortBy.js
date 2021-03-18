import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import chevronUpFill from '@iconify-icons/eva/chevron-up-fill';
import chevronDownFill from '@iconify-icons/eva/chevron-down-fill';
import { makeStyles } from '@material-ui/core/styles';
import { Menu, Button, MenuItem, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3)
    }
  }
}));

// ----------------------------------------------------------------------

function renderLabel(label) {
  if (label === 'featured') {
    return 'Featured';
  }
  if (label === 'newest') {
    return 'Newest';
  }
  if (label === 'priceDesc') {
    return 'Price: High-Low';
  }
  if (label === 'priceAsc') {
    return 'Price: Low-High';
  }
  return label;
}

SortBy.propTypes = {
  sortBy: PropTypes.string,
  sortByOptions: PropTypes.array,
  onSortBy: PropTypes.func,
  className: PropTypes.string
};

function SortBy({ sortByOptions, sortBy, onSortBy, className, ...other }) {
  const classes = useStyles();
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleonSortBy = (value) => {
    handleClose();
    onSortBy(value);
  };

  return (
    <div className={clsx(classes.root, className)} {...other}>
      <Button
        color="inherit"
        disableRipple
        onClick={handleOpen}
        endIcon={<Icon icon={open ? chevronUpFill : chevronDownFill} />}
      >
        Sort By:&nbsp;
        <Typography
          component="span"
          variant="subtitle2"
          sx={{ color: 'text.secondary' }}
        >
          {renderLabel(sortBy)}
        </Typography>
      </Button>
      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {sortByOptions.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === sortBy}
            onClick={() => handleonSortBy(option.value)}
            sx={{ typography: 'body2' }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default SortBy;

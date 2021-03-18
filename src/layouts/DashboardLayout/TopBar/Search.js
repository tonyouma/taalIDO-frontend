import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import searchFill from '@iconify-icons/eva/search-fill';
import { makeStyles, alpha } from '@material-ui/core/styles';
import {
  Box,
  Input,
  Slide,
  Button,
  InputAdornment,
  ClickAwayListener
} from '@material-ui/core';
import { MIconButton } from 'src/theme';

// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const useStyles = makeStyles((theme) => ({
  root: {},
  searchBar: {
    top: 0,
    left: 0,
    zIndex: 99,
    width: '100%',
    display: 'flex',
    position: 'absolute',
    alignItems: 'center',
    height: APPBAR_MOBILE,
    backdropFilter: 'blur(8px)',
    padding: theme.spacing(0, 3),
    boxShadow: theme.shadows[25].z8,
    backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
    [theme.breakpoints.up('md')]: {
      height: APPBAR_DESKTOP,
      padding: theme.spacing(0, 5)
    }
  },
  input: {
    marginRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightBold
  }
}));

// ----------------------------------------------------------------------

Search.propTypes = {
  className: PropTypes.string
};

function Search({ className }) {
  const classes = useStyles();
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div className={clsx(classes.root, className)}>
        {!isOpen && (
          <MIconButton onClick={handleOpen}>
            <Icon icon={searchFill} width={20} height={20} />
          </MIconButton>
        )}

        <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
          <div className={classes.searchBar}>
            <Input
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search…"
              startAdornment={
                <InputAdornment position="start">
                  <Box
                    component={Icon}
                    icon={searchFill}
                    sx={{ color: 'text.disabled', width: 20, height: 20 }}
                  />
                </InputAdornment>
              }
              className={classes.input}
            />
            <Button variant="contained" onClick={handleClose}>
              Search
            </Button>
          </div>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}

export default Search;

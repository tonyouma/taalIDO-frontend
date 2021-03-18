import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import Logo from 'src/components/Logo';
import { PATH_APP } from 'src/routes/paths';
import Settings from 'src/layouts/Common/Settings';
import { Link as RouterLink } from 'react-router-dom';
import menu2Fill from '@iconify-icons/eva/menu-2-fill';
import arrowIosForwardFill from '@iconify-icons/eva/arrow-ios-forward-fill';
import { alpha, makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  AppBar,
  Hidden,
  Toolbar,
  IconButton
} from '@material-ui/core';

// ----------------------------------------------------------------------

const APPBAR_HEIGHT = 64;

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 999,
    backdropFilter: 'blur(8px)',
    boxShadow: theme.shadows[25].z8,
    color: theme.palette.text.primary,
    backgroundColor: alpha(theme.palette.background.default, 0.72),
    [theme.breakpoints.up('md')]: {
      zIndex: 1999
    }
  }
}));

// ----------------------------------------------------------------------

TopBar.propTypes = {
  onOpenNav: PropTypes.func
};

function TopBar({ onOpenNav, className }) {
  const classes = useStyles();

  return (
    <AppBar className={clsx(classes.root, className)}>
      <Toolbar className={classes.toolbar} sx={{ minHeight: APPBAR_HEIGHT }}>
        <Hidden mdUp>
          <IconButton onClick={onOpenNav} color="inherit">
            <Icon icon={menu2Fill} />
          </IconButton>
        </Hidden>

        <Hidden mdDown>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
        </Hidden>

        <Box sx={{ flexGrow: 1 }} />

        <Settings />

        <Button
          disableRipple
          to={PATH_APP.root}
          component={RouterLink}
          endIcon={<Icon icon={arrowIosForwardFill} />}
        >
          Dashboard
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;

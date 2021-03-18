import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { NavigationControl } from 'react-map-gl';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 99,
    borderRadius: 8,
    overflow: 'hidden',
    bottom: theme.spacing(6),
    left: theme.spacing(1.5),
    boxShadow: theme.shadows[25].z8,
    '& button+button': {
      borderTop: `1px solid ${theme.palette.divider}`
    }
  }
}));

// ----------------------------------------------------------------------

ControlNavigation.propTypes = {
  className: PropTypes.string
};

function ControlNavigation({ className, ...other }) {
  const classes = useStyles();

  return (
    <NavigationControl className={clsx(classes.root, className)} {...other} />
  );
}

export default ControlNavigation;

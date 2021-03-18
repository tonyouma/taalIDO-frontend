import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { FullscreenControl } from 'react-map-gl';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 99,
    borderRadius: 8,
    overflow: 'hidden',
    top: theme.spacing(1.5),
    left: theme.spacing(1.5),
    boxShadow: theme.shadows[25].z8,
    '& span.mapboxgl-ctrl-icon': {
      transform: ' scale(0.75)'
    }
  }
}));

// ----------------------------------------------------------------------

ControlFullscreen.propTypes = {
  className: PropTypes.string
};

function ControlFullscreen({ className, ...other }) {
  const classes = useStyles();

  return (
    <FullscreenControl className={clsx(classes.root, className)} {...other} />
  );
}

export default ControlFullscreen;

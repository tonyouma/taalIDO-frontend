import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { GeolocateControl } from 'react-map-gl';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 99,
    borderRadius: 8,
    overflow: 'hidden',
    top: theme.spacing(6),
    left: theme.spacing(1.5),
    boxShadow: theme.shadows[25].z8
  }
}));

// ----------------------------------------------------------------------

ControlGeolocate.propTypes = {
  className: PropTypes.string
};

function ControlGeolocate({ className, ...other }) {
  const classes = useStyles();

  return (
    <GeolocateControl
      className={clsx(classes.root, className)}
      positionOptions={{ enableHighAccuracy: true }}
      trackUserLocation={true}
      {...other}
    />
  );
}

export default ControlGeolocate;

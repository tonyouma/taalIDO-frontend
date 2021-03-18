import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { ScaleControl } from 'react-map-gl';
import { makeStyles } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 99,
    left: theme.spacing(1.5),
    bottom: theme.spacing(1.5),
    boxShadow: theme.shadows[25].z8,
    '& .mapboxgl-ctrl': {
      border: 'none',
      borderRadius: 4,
      lineHeight: '14px',
      color: theme.palette.common.white,
      backgroundImage: `linear-gradient(to right, #8a2387, #e94057, #f27121)`
    }
  }
}));

// ----------------------------------------------------------------------

ControlScale.propTypes = {
  className: PropTypes.string
};

function ControlScale({ className, ...other }) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <ScaleControl
        maxWidth={100}
        unit={'imperial'}
        className={clsx(classes.root, className)}
        {...other}
      />
    </div>
  );
}

export default ControlScale;

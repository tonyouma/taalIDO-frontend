import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { GoogleMap, GroundOverlay } from '@react-google-maps/api';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

const bounds = {
  north: 40.773941,
  south: 40.712216,
  east: -74.12544,
  west: -74.22655
};

GoogleMapGroundOverlay.propTypes = {
  themes: PropTypes.object,
  className: PropTypes.string
};

function GoogleMapGroundOverlay({ mapThemes, className, ...other }) {
  const classes = useStyles();

  const center = { lat: 40.74, lng: -74.18 };
  const mapOptions = {
    zoom: 12,
    minZoom: 2,
    maxZoom: 16,
    center: center,
    controlSize: 24,
    scaleControl: true,
    streetViewControl: false
  };

  return (
    <div className={clsx(classes.root, className)}>
      <GoogleMap
        options={mapOptions}
        mapContainerStyle={{
          width: '100%',
          height: '100%'
        }}
        {...other}
      >
        <GroundOverlay
          key={'url'}
          url="https://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg"
          bounds={bounds}
        />
      </GoogleMap>
    </div>
  );
}

export default GoogleMapGroundOverlay;

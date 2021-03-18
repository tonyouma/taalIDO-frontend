import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { GoogleMap, DrawingManager } from '@react-google-maps/api';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

GoogleMapDrawingManager.propTypes = {
  themes: PropTypes.object,
  className: PropTypes.string
};

function GoogleMapDrawingManager({ themes, className, ...other }) {
  const classes = useStyles();

  const center = { lat: 39.09366509575983, lng: -94.58751660204751 };
  const mapOptions = {
    zoom: 2,
    minZoom: 2,
    maxZoom: 16,
    center: center,
    controlSize: 24,
    scaleControl: true,
    streetViewControl: false,
    styles: themes.silver
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
        <DrawingManager
          options={{
            drawingControlOptions: {
              position: window.google.maps.ControlPosition.TOP_CENTER
            }
          }}
        />
      </GoogleMap>
    </div>
  );
}

export default GoogleMapDrawingManager;

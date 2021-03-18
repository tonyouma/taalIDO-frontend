import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, Polyline } from '@react-google-maps/api';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

GoogleMapPolyline.propTypes = {
  themes: PropTypes.object,
  className: PropTypes.string
};

function GoogleMapPolyline({ themes, className, ...other }) {
  const classes = useStyles();
  const theme = useTheme();

  const center = { lat: 0, lng: -180 };
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
        mapContainerStyle={{
          width: '100%',
          height: '100%'
        }}
        options={mapOptions}
        {...other}
      >
        <Polyline
          path={[
            { lat: 37.772, lng: -122.214 },
            { lat: 21.291, lng: -157.821 },
            { lat: -18.142, lng: 178.431 },
            { lat: -27.467, lng: 153.027 }
          ]}
          options={{
            strokeColor: theme.palette.error.main,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: theme.palette.error.main,
            fillOpacity: 0.35,
            clickable: false,
            draggable: false,
            editable: false,
            visible: true,
            radius: 30000,
            paths: [
              { lat: 37.772, lng: -122.214 },
              { lat: 21.291, lng: -157.821 },
              { lat: -18.142, lng: 178.431 },
              { lat: -27.467, lng: 153.027 }
            ],
            zIndex: 1
          }}
        />
      </GoogleMap>
    </div>
  );
}

export default GoogleMapPolyline;

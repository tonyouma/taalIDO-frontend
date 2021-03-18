import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, Circle } from '@react-google-maps/api';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

GoogleMapCircle.propTypes = {
  themes: PropTypes.object,
  className: PropTypes.string
};

function GoogleMapCircle({ themes, className, ...other }) {
  const classes = useStyles();
  const theme = useTheme();

  const center = { lat: -3.745, lng: -38.523 };
  const mapOptions = {
    zoom: 10,
    minZoom: 6,
    maxZoom: 12,
    center: center,
    controlSize: 24,
    scaleControl: true,
    streetViewControl: false,
    styles: themes.silver,
    mapTypeControlOptions: {
      mapTypeIds: [
        window.google.maps.MapTypeId.ROADMAP,
        window.google.maps.MapTypeId.HYBRID,
        window.google.maps.MapTypeId.SATELLITE,
        window.google.maps.MapTypeId.TERRAIN
      ],
      style: window.google.maps.MapTypeControlStyle.DROPDOWN_MENU
    }
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
        <Circle
          center={center}
          options={{
            zIndex: 1,
            visible: true,
            radius: 10000,
            strokeWeight: 2,
            editable: false,
            strokeOpacity: 1,
            clickable: false,
            draggable: false,
            fillOpacity: 0.24,
            fillColor: theme.palette.error.main,
            strokeColor: theme.palette.error.main
          }}
        />
      </GoogleMap>
    </div>
  );
}

export default GoogleMapCircle;

import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { GoogleMap, Rectangle } from '@react-google-maps/api';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

GoogleMapRectangle.propTypes = {
  themes: PropTypes.object,
  className: PropTypes.string
};

function GoogleMapRectangle({ themes, className, ...other }) {
  const classes = useStyles();
  const theme = useTheme();

  const center = { lat: 38.685, lng: -115.234 };
  const mapOptions = {
    zoom: 2,
    minZoom: 4,
    maxZoom: 12,
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
        <Rectangle
          bounds={{
            north: 38.685,
            south: 33.671,
            east: -115.234,
            west: -118.251
          }}
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

export default GoogleMapRectangle;

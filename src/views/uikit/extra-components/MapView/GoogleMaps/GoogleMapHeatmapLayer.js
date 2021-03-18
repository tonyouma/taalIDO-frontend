import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { GoogleMap, HeatmapLayer } from '@react-google-maps/api';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

GoogleMapHeatmapLayer.propTypes = {
  themes: PropTypes.object,
  className: PropTypes.string
};

function GoogleMapHeatmapLayer({ themes, className, ...other }) {
  const classes = useStyles();
  const center = { lat: 37.774546, lng: -122.433523 };

  const mapOptions = {
    zoom: 14,
    minZoom: 4,
    maxZoom: 16,
    center: center,
    controlSize: 24,
    scaleControl: true,
    streetViewControl: false,
    styles: themes.retro
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
        <HeatmapLayer
          data={[
            new window.google.maps.LatLng(37.782, -122.447),
            new window.google.maps.LatLng(37.782, -122.445),
            new window.google.maps.LatLng(37.782, -122.443),
            new window.google.maps.LatLng(37.782, -122.441),
            new window.google.maps.LatLng(37.782, -122.439),
            new window.google.maps.LatLng(37.782, -122.437),
            new window.google.maps.LatLng(37.782, -122.435),
            new window.google.maps.LatLng(37.785, -122.447),
            new window.google.maps.LatLng(37.785, -122.445),
            new window.google.maps.LatLng(37.785, -122.443),
            new window.google.maps.LatLng(37.785, -122.441),
            new window.google.maps.LatLng(37.785, -122.439),
            new window.google.maps.LatLng(37.785, -122.437),
            new window.google.maps.LatLng(37.785, -122.435)
          ]}
        />
      </GoogleMap>
    </div>
  );
}

export default GoogleMapHeatmapLayer;

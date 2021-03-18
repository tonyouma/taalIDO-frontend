import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, Polygon } from '@react-google-maps/api';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

GoogleMapPolygon.propTypes = {
  themes: PropTypes.object,
  className: PropTypes.string
};

function GoogleMapPolygon({ themes, className, ...other }) {
  const classes = useStyles();
  const theme = useTheme();

  const center = { lat: 24.886, lng: -70.268 };
  const mapOptions = {
    zoom: 3,
    minZoom: 2,
    maxZoom: 16,
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
        <Polygon
          paths={[
            { lat: 25.774, lng: -80.19 },
            { lat: 18.466, lng: -66.118 },
            { lat: 32.321, lng: -64.757 },
            { lat: 25.774, lng: -80.19 }
          ]}
          options={{
            fillColor: theme.palette.error.main,
            fillOpacity: 0.24,
            strokeColor: theme.palette.error.main,
            strokeOpacity: 1,
            strokeWeight: 2,
            clickable: false,
            draggable: false,
            editable: false,
            geodesic: false,
            zIndex: 1
          }}
        />
      </GoogleMap>
    </div>
  );
}

export default GoogleMapPolygon;

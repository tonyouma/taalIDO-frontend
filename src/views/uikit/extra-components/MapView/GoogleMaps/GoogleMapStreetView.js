import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { GoogleMap, StreetViewService } from '@react-google-maps/api';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

GoogleMapStreetView.propTypes = {
  themes: PropTypes.object,
  className: PropTypes.string
};

function GoogleMapStreetView({ themes, className, ...other }) {
  const classes = useStyles();

  const center = { lat: 37.869085, lng: -122.254775 };
  const mapOptions = {
    zoom: 14,
    minZoom: 2,
    maxZoom: 16,
    center: center,
    controlSize: 24
  };

  const onLoad = (streetViewService) => {
    streetViewService.getPanorama(
      { location: center, radius: 50 },
      (data, status) => console.log('')
      // console.log('StreetViewService results', { data, status })
    );
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
        <StreetViewService onLoad={onLoad} />
      </GoogleMap>
    </div>
  );
}

export default GoogleMapStreetView;

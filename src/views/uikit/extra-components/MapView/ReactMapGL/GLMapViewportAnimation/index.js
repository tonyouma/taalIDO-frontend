import clsx from 'clsx';
import PropTypes from 'prop-types';
import ControlPanel from './ControlPanel';
import React, { useState, useCallback } from 'react';
import MapGL, { FlyToInterpolator } from 'react-map-gl';
import {
  ControlScale,
  ControlGeolocate,
  ControlNavigation,
  ControlFullscreen
} from '../controls';
import { makeStyles } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

ControlPanel.propTypes = {
  data: PropTypes.array,
  className: PropTypes.string
};

function GLMapViewportAnimation({ data, className, ...other }) {
  const classes = useStyles();
  const [selectedCity, setSelectedCity] = useState(data[2].city);
  const [viewport, setViewport] = useState({
    latitude: 37.7751,
    longitude: -122.4193,
    zoom: 10,
    bearing: 0,
    pitch: 0
  });

  const handleChangeCity = useCallback((event, { longitude, latitude }) => {
    setSelectedCity(event.target.value);
    setViewport({
      longitude,
      latitude,
      zoom: 10,
      transitionInterpolator: new FlyToInterpolator({ speed: 1.2 }),
      transitionDuration: 'auto'
    });
  }, []);

  return (
    <div className={clsx(classes.root, className)}>
      <MapGL
        {...viewport}
        onViewportChange={setViewport}
        dragRotate={false}
        {...other}
      >
        <ControlScale />
        <ControlNavigation />
        <ControlFullscreen />
        <ControlGeolocate />

        <ControlPanel
          data={data}
          selectedCity={selectedCity}
          handleChange={handleChangeCity}
        />
      </MapGL>
    </div>
  );
}

export default GLMapViewportAnimation;

import clsx from 'clsx';
import MapGL from 'react-map-gl';
import PropTypes from 'prop-types';
import ControlPanel from './ControlPanel';
import React, { useState, useCallback } from 'react';
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
  className: PropTypes.string
};

function GLMapInteraction({ data, className, ...other }) {
  const classes = useStyles();

  const [interactionState, setInteractionState] = useState({});
  const [viewport, setViewport] = useState({
    latitude: 37.729,
    longitude: -122.36,
    zoom: 11,
    bearing: 0,
    pitch: 50
  });
  const [settings, setSettings] = useState({
    dragPan: true,
    dragRotate: true,
    scrollZoom: true,
    touchZoom: true,
    touchRotate: true,
    keyboard: true,
    doubleClickZoom: true,
    minZoom: 0,
    maxZoom: 20,
    minPitch: 0,
    maxPitch: 85
  });

  const handleChangeSetting = useCallback(
    (name, value) =>
      setSettings((settings) => ({
        ...settings,
        [name]: value
      })),
    []
  );

  return (
    <div className={clsx(classes.root, className)}>
      <MapGL
        {...viewport}
        {...settings}
        onViewportChange={setViewport}
        onInteractionStateChange={(interactionState) =>
          setInteractionState(interactionState)
        }
        {...other}
      >
        <ControlScale />
        <ControlNavigation />
        <ControlFullscreen />
        <ControlGeolocate />

        <ControlPanel
          settings={settings}
          interactionState={interactionState}
          onChange={handleChangeSetting}
        />
      </MapGL>
    </div>
  );
}

export default GLMapInteraction;

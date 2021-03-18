import clsx from 'clsx';
import ReactMapGL from 'react-map-gl';
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

function GLChangeTheme({ themes, className, ...other }) {
  const classes = useStyles();
  const [selectTheme, setSelectTheme] = useState('outdoors');
  const [viewport, setViewport] = useState({
    latitude: 37.785164,
    longitude: -100,
    zoom: 3.5,
    bearing: 0,
    pitch: 0
  });

  const handleChangeTheme = useCallback(
    (event) => setSelectTheme(event.target.value),
    []
  );

  return (
    <div className={clsx(classes.root, className)}>
      <ReactMapGL
        {...viewport}
        onViewportChange={setViewport}
        mapStyle={themes[selectTheme]}
        {...other}
      >
        <ControlScale />
        <ControlNavigation />
        <ControlFullscreen />
        <ControlGeolocate />
      </ReactMapGL>

      <ControlPanel
        themes={themes}
        selectTheme={selectTheme}
        onChangeTheme={handleChangeTheme}
      />
    </div>
  );
}

export default GLChangeTheme;

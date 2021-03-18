import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import MapGL, { Layer, Source } from 'react-map-gl';
import {
  ControlScale,
  ControlGeolocate,
  ControlNavigation,
  ControlFullscreen
} from './controls';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

function pointOnCircle({ center, angle, radius }) {
  return {
    type: 'Point',
    coordinates: [
      center[0] + Math.cos(angle) * radius,
      center[1] + Math.sin(angle) * radius
    ]
  };
}

GLGeoJSONAnimation.propTypes = {
  className: PropTypes.string
};

function GLGeoJSONAnimation({ className, ...other }) {
  const classes = useStyles();
  const theme = useTheme();

  const [pointData, setPointData] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: -100,
    zoom: 3,
    bearing: 0,
    pitch: 0
  });

  const pointLayer = {
    type: 'circle',
    paint: {
      'circle-radius': 10,
      'circle-color': theme.palette.error.main
    }
  };

  useEffect(() => {
    const animation = window.requestAnimationFrame(() =>
      setPointData(
        pointOnCircle({
          center: [-100, 0],
          angle: Date.now() / 1000,
          radius: 20
        })
      )
    );
    return () => window.cancelAnimationFrame(animation);
  });

  return (
    <div className={clsx(classes.root, className)}>
      <MapGL {...viewport} onViewportChange={setViewport} {...other}>
        <ControlScale />
        <ControlNavigation />
        <ControlFullscreen />
        <ControlGeolocate />

        {pointData && (
          <Source type="geojson" data={pointData}>
            <Layer {...pointLayer} />
          </Source>
        )}
      </MapGL>
    </div>
  );
}

export default GLGeoJSONAnimation;

import clsx from 'clsx';
import MapGL from 'react-map-gl';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import DeckGL, { ArcLayer } from 'deck.gl';
import {
  ControlScale,
  ControlGeolocate,
  ControlNavigation,
  ControlFullscreen
} from './controls';
import { makeStyles } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

GLDeckglOverlay.propTypes = {
  className: PropTypes.string
};

function GLDeckglOverlay({ className, ...other }) {
  const classes = useStyles();
  const [viewport, setViewport] = useState({
    longitude: -122.45,
    latitude: 37.78,
    zoom: 11,
    bearing: 0,
    pitch: 30
  });

  return (
    <div className={clsx(classes.root, className)}>
      <MapGL
        {...viewport}
        onViewportChange={setViewport}
        maxPitch={85}
        {...other}
      >
        <ControlScale />
        <ControlNavigation />
        <ControlFullscreen />
        <ControlGeolocate />

        <DeckGL
          viewState={viewport}
          layers={[
            new ArcLayer({
              data: [
                {
                  sourcePosition: [-122.41669, 37.7853],
                  targetPosition: [-122.45669, 37.781]
                }
              ],
              strokeWidth: 4,
              getSourceColor: (x) => [0, 0, 255],
              getTargetColor: (x) => [0, 255, 0]
            })
          ]}
        />
      </MapGL>
    </div>
  );
}

export default GLDeckglOverlay;

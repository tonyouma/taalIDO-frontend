import clsx from 'clsx';
import MapGL from 'react-map-gl';
import PropTypes from 'prop-types';
import ControlPanel from './ControlPanel';
import React, { useState, useCallback } from 'react';
import {
  ControlMarker,
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

GLDraggableMarkers.propTypes = {
  className: PropTypes.string
};

function GLDraggableMarkers({ className, ...other }) {
  const classes = useStyles();
  const [events, logEvents] = useState({});
  const [marker, setMarker] = useState({
    latitude: 40,
    longitude: -100
  });
  const [viewport, setViewport] = useState({
    latitude: 40,
    longitude: -100,
    zoom: 3.5,
    bearing: 0,
    pitch: 0
  });

  const onMarkerDragStart = useCallback((event) => {
    logEvents((_events) => ({ ..._events, onDragStart: event.lngLat }));
  }, []);

  const onMarkerDrag = useCallback((event) => {
    logEvents((_events) => ({ ..._events, onDrag: event.lngLat }));
  }, []);

  const onMarkerDragEnd = useCallback((event) => {
    logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }));
    setMarker({
      longitude: event.lngLat[0],
      latitude: event.lngLat[1]
    });
  }, []);

  return (
    <div className={clsx(classes.root, className)}>
      <MapGL {...viewport} onViewportChange={setViewport} {...other}>
        <ControlScale />
        <ControlNavigation />
        <ControlFullscreen />
        <ControlGeolocate />

        <ControlMarker
          draggable
          longitude={marker.longitude}
          latitude={marker.latitude}
          offsetTop={-20}
          offsetLeft={-10}
          onDragStart={onMarkerDragStart}
          onDrag={onMarkerDrag}
          onDragEnd={onMarkerDragEnd}
        />
      </MapGL>

      <ControlPanel events={events} />
    </div>
  );
}

export default GLDraggableMarkers;

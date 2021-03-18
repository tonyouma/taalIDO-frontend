import clsx from 'clsx';
import PropTypes from 'prop-types';
import MapGL, { Layer, Source } from 'react-map-gl';
import React, { useState, useCallback, useMemo } from 'react';
import {
  ControlPopup,
  ControlScale,
  ControlGeolocate,
  ControlNavigation,
  ControlFullscreen
} from './controls';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

GLHighlightByFilter.propTypes = {
  className: PropTypes.string
};

function GLHighlightByFilter({ data, className, ...other }) {
  const classes = useStyles();
  const theme = useTheme();
  const [hoverInfo, setHoverInfo] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 38.88,
    longitude: -98,
    zoom: 3,
    minZoom: 2,
    bearing: 0,
    pitch: 0
  });

  const selectedCounty = (hoverInfo && hoverInfo.countyName) || '';
  const filter = useMemo(() => ['in', 'COUNTY', selectedCounty], [
    selectedCounty
  ]);

  const countiesLayer = {
    id: 'counties',
    type: 'fill',
    source: 'counties',
    'source-layer': 'original',
    paint: {
      'fill-outline-color': theme.palette.grey[900],
      'fill-color': theme.palette.grey[900],
      'fill-opacity': 0.12
    }
  };

  const highlightLayer = {
    id: 'counties-highlighted',
    type: 'fill',
    source: 'counties',
    'source-layer': 'original',
    paint: {
      'fill-outline-color': theme.palette.error.main,
      'fill-color': theme.palette.error.main,
      'fill-opacity': 0.48
    }
  };

  const onHover = useCallback((event) => {
    const county = event.features && event.features[0];
    setHoverInfo({
      longitude: event.lngLat[0],
      latitude: event.lngLat[1],
      countyName: county && county.properties.COUNTY
    });
  }, []);

  return (
    <div className={clsx(classes.root, className)}>
      <MapGL
        {...viewport}
        onViewportChange={setViewport}
        onHover={onHover}
        interactiveLayerIds={['counties']}
        {...other}
      >
        <ControlScale />
        <ControlNavigation />
        <ControlFullscreen />
        <ControlGeolocate />

        <Source type="vector" url="mapbox://mapbox.82pkq93d">
          <Layer beforeId="waterway-label" {...countiesLayer} />
          <Layer
            beforeId="waterway-label"
            {...highlightLayer}
            filter={filter}
          />
        </Source>

        {selectedCounty && (
          <ControlPopup
            longitude={hoverInfo.longitude}
            latitude={hoverInfo.latitude}
            closeButton={false}
          >
            <Typography variant="body2" sx={{ color: 'common.white' }}>
              {selectedCounty}
            </Typography>
          </ControlPopup>
        )}
      </MapGL>
    </div>
  );
}

export default GLHighlightByFilter;

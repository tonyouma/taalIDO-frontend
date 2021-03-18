import clsx from 'clsx';
import bbox from '@turf/bbox';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import MAP_STYLE from './data/map-style-basic-v8.json';
import MapGL, { LinearInterpolator, WebMercatorViewport } from 'react-map-gl';
import {
  ControlScale,
  ControlGeolocate,
  ControlNavigation,
  ControlFullscreen
} from './controls';
import { makeStyles } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const mapStyle = {
  ...MAP_STYLE,
  sources: { ...MAP_STYLE.sources },
  layers: MAP_STYLE.layers.slice()
};

mapStyle.sources['sf-neighborhoods'] = {
  type: 'geojson',
  data:
    'https://raw.githubusercontent.com/uber/react-map-gl/master/examples/.data/feature-example-sf.json'
};

mapStyle.layers.push(
  {
    id: 'sf-neighborhoods-fill',
    source: 'sf-neighborhoods',
    type: 'fill',
    paint: {
      'fill-outline-color': '#0040c8',
      'fill-color': '#fff',
      'fill-opacity': 0
    }
  },
  {
    id: 'sf-neighborhoods-outline',
    source: 'sf-neighborhoods',
    type: 'line',
    paint: {
      'line-width': 2,
      'line-color': '#0080ef'
    }
  }
);

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

GLZoomToBounds.propTypes = {
  data: PropTypes.array,
  className: PropTypes.string
};

function GLZoomToBounds({ data, className, ...other }) {
  const classes = useStyles();
  const [viewport, setViewport] = useState({
    latitude: 37.78,
    longitude: -122.4,
    zoom: 11,
    bearing: 0,
    pitch: 0
  });

  const onClick = (event) => {
    const feature = event.features[0];
    if (feature) {
      const [minLng, minLat, maxLng, maxLat] = bbox(feature);
      const viewports = new WebMercatorViewport(viewport);
      const { longitude, latitude, zoom } = viewports.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat]
        ],
        { padding: 40 }
      );
      setViewport({
        longitude,
        latitude,
        zoom,
        transitionInterpolator: new LinearInterpolator({
          around: [event.offsetCenter.x, event.offsetCenter.y]
        }),
        transitionDuration: 1000
      });
    }
  };

  return (
    <div className={clsx(classes.root, className)}>
      <MapGL
        {...viewport}
        mapStyle={mapStyle}
        onViewportChange={setViewport}
        onClick={onClick}
        interactiveLayerIds={['sf-neighborhoods-fill']}
        {...other}
      >
        <ControlScale />
        <ControlNavigation />
        <ControlFullscreen />
        <ControlGeolocate />
      </MapGL>
    </div>
  );
}

export default GLZoomToBounds;

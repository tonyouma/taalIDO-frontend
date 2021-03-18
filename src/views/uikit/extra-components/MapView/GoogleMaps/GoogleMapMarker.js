import clsx from 'clsx';
import faker from 'faker';
import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';

import {
  Marker,
  GoogleMap,
  InfoWindow,
  MarkerClusterer
} from '@react-google-maps/api';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';

// ----------------------------------------------------------------------

const LOCATIONS = [
  {
    id: 'place1',
    image: faker.image.animals(),
    description: 'Fusce a quam. Aenean vulputate eleifend tellus.',
    pos: { lat: 39.09366509575983, lng: -94.58751660204751 }
  },
  {
    id: 'place2',
    image: faker.image.animals(),
    description: 'Fusce a quam. Aenean vulputate eleifend tellus.',
    pos: { lat: 39.10894664788252, lng: -94.57926449532226 }
  },
  {
    id: 'place3',
    image: faker.image.animals(),
    description: 'Fusce a quam. Aenean vulputate eleifend tellus.',
    pos: { lat: 39.07602397235644, lng: -94.5184089401211 }
  }
];

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

GoogleMapMarker.propTypes = {
  themes: PropTypes.object,
  className: PropTypes.string
};

function GoogleMapMarker({ themes, className, ...other }) {
  const classes = useStyles();
  const theme = useTheme();
  const [, setMap] = useState(null);
  const [zoom, setZoom] = useState(2);
  const [center, setCenter] = useState(LOCATIONS[0].pos);
  const [markerMap, setMarkerMap] = useState({});
  const [infoOpen, setInfoOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    LOCATIONS.map((location) => {
      bounds.extend(location.pos);
      return location.id;
    });
    map.fitBounds(bounds);
  }, []);

  const onUnmount = useCallback(
    function callback(map) {
      setMap(null);
    },
    [setMap]
  );

  const markerLoadHandler = (marker, location) => {
    return setMarkerMap((prevState) => {
      return { ...prevState, [location.id]: marker };
    });
  };

  const markerClickHandler = (event, location) => {
    setSelectedPlace(location);
    if (infoOpen) {
      setInfoOpen(false);
    }
    setInfoOpen(true);
    if (zoom < 12) {
      setZoom(12);
    }
    setCenter(location.pos);
  };

  const mapOptions = {
    zoom: zoom,
    minZoom: 2,
    maxZoom: 16,
    center: center,
    controlSize: 24,
    scaleControl: true,
    streetViewControl: false,
    styles: themes.silver
  };

  return (
    <div className={clsx(classes.root, className)}>
      <GoogleMap
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}
        mapContainerStyle={{
          width: '100%',
          height: '100%'
        }}
        {...other}
      >
        <MarkerClusterer>
          {(clusterer) =>
            LOCATIONS.map((location) => (
              <Marker
                key={location.id}
                clusterer={clusterer}
                position={location.pos}
                onLoad={(marker) => markerLoadHandler(marker, location)}
                onClick={(event) => markerClickHandler(event, location)}
                icon={{
                  path:
                    'M8 0C3.61277632-.00021937.04387223 3.53299568 0 7.92 0 13.4 7.05 19.5 7.35 19.76c.374224.3200877.925776.3200877 1.3 0C9 19.5 16 13.4 16 7.92 15.9561278 3.53299568 12.3872237-.00021937 8 0zm0 11c-1.9329966 0-3.5-1.5670034-3.5-3.5C4.5 5.56700338 6.0670034 4 8 4s3.5 1.56700338 3.5 3.5c0 .9282577-.3687489 1.8184964-1.0251263 2.4748737C9.8184964 10.6312511 8.9282577 11 8 11z',
                  fillColor: theme.palette.error.main,
                  fillOpacity: 1.0,
                  strokeWeight: 0,
                  scale: 1.5
                }}
              />
            ))
          }
        </MarkerClusterer>

        {infoOpen && selectedPlace && (
          <InfoWindow
            anchor={markerMap[selectedPlace.id]}
            onCloseClick={() => setInfoOpen(false)}
          >
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="subtitle2" sx={{ color: 'grey.800' }}>
                {selectedPlace.id}
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey.600' }}>
                {selectedPlace.description}
              </Typography>
              <Box
                component="img"
                alt={selectedPlace.id}
                src={selectedPlace.image}
                sx={{
                  mt: 2,
                  width: 320,
                  borderRadius: 1
                }}
              />
            </Box>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export default GoogleMapMarker;

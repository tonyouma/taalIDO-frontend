import clsx from 'clsx';
import MapGL from 'react-map-gl';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  ControlPopup,
  ControlMarker,
  ControlScale,
  ControlGeolocate,
  ControlNavigation,
  ControlFullscreen
} from './controls';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

GLMarkersPopups.propTypes = {
  data: PropTypes.array,
  className: PropTypes.string
};

function GLMarkersPopups({ data, className, ...other }) {
  const classes = useStyles();
  const [tooltip, setTooltip] = useState(null);
  const [viewport, setViewport] = useState({
    zoom: 2
  });

  return (
    <div className={clsx(classes.root, className)}>
      <MapGL {...viewport} onViewportChange={setViewport} {...other}>
        <ControlScale />
        <ControlNavigation />
        <ControlFullscreen />
        <ControlGeolocate />

        {data.map((country) => (
          <ControlMarker
            key={country.name}
            latitude={country.latlng[0]}
            longitude={country.latlng[1]}
            onClick={() => setTooltip(country)}
          />
        ))}

        {tooltip && (
          <ControlPopup
            longitude={tooltip.latlng[1]}
            latitude={tooltip.latlng[0]}
            onClose={() => setTooltip(false)}
          >
            <Box sx={{ color: 'common.white' }}>
              <Box
                sx={{
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Box
                  sx={{
                    height: '18px',
                    minWidth: '28px',
                    marginRight: '8px',
                    borderRadius: '4px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage: `url(https://cdn.staticaly.com/gh/hjnilsson/country-flags/master/svg/${tooltip.country_code.toLowerCase()}.svg)`
                  }}
                />
                <Typography variant="subtitle2">{tooltip.name}</Typography>
              </Box>
              <Typography component="div" variant="caption">
                Timezones: {tooltip.timezones}
              </Typography>
              <Typography component="div" variant="caption">
                Lat: {tooltip.latlng[0]}
              </Typography>
              <Typography component="div" variant="caption">
                Long: {tooltip.latlng[1]}
              </Typography>
              <Box
                component="img"
                alt={tooltip.name}
                src={tooltip.photo}
                sx={{
                  mt: 1,
                  width: 160,
                  height: 90,
                  borderRadius: 1,
                  objectFit: 'cover'
                }}
              />
            </Box>
          </ControlPopup>
        )}
      </MapGL>
    </div>
  );
}

export default GLMarkersPopups;

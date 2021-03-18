import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { capitalCase } from 'change-case';
import { GoogleMap, Circle } from '@react-google-maps/api';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  select: {
    flip: false,
    zIndex: 9,
    overflow: 'hidden',
    position: 'absolute',
    left: theme.spacing(1),
    bottom: theme.spacing(4),
    boxShadow: theme.shadows[25].z8,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    '& fieldset': {
      border: `none !important`
    },
    '& select': {
      ...theme.typography.subtitle2,
      paddingTop: 5,
      paddingBottom: 6,
      paddingLeft: 12,
      color: theme.palette.grey[800]
    }
  }
}));

// ----------------------------------------------------------------------

GoogleMapChangeTheme.propTypes = {
  themes: PropTypes.object,
  className: PropTypes.string
};

function GoogleMapChangeTheme({ themes, className, ...other }) {
  const classes = useStyles();
  const theme = useTheme();
  const [style, setStyle] = useState('aubergine');

  const center = { lat: -3.745, lng: -38.523 };
  const mapOptions = {
    zoom: 10,
    minZoom: 6,
    maxZoom: 12,
    center: center,
    controlSize: 24,
    scaleControl: true,
    streetViewControl: false,
    styles: themes[style],
    mapTypeControlOptions: {
      mapTypeIds: [
        window.google.maps.MapTypeId.ROADMAP,
        window.google.maps.MapTypeId.HYBRID,
        window.google.maps.MapTypeId.SATELLITE,
        window.google.maps.MapTypeId.TERRAIN
      ],
      style: window.google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      position: window.google.maps.ControlPosition.TOP_LEFT
    }
  };

  const handleChangeTheme = (event) => {
    setStyle(event.target.value);
  };

  return (
    <div className={clsx(classes.root, className)}>
      <TextField
        select
        size="small"
        value={style}
        onChange={handleChangeTheme}
        SelectProps={{ native: true }}
        className={classes.select}
      >
        {Object.keys(themes).map((option) => (
          <option key={option} value={option}>
            {capitalCase(option)}
          </option>
        ))}
      </TextField>

      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: '100%'
        }}
        options={mapOptions}
        {...other}
      >
        <Circle
          center={center}
          options={{
            zIndex: 1,
            visible: true,
            radius: 10000,
            strokeWeight: 2,
            editable: false,
            strokeOpacity: 1,
            clickable: false,
            draggable: false,
            fillOpacity: 0.24,
            fillColor: theme.palette.error.main,
            strokeColor: theme.palette.error.main
          }}
        />
      </GoogleMap>
    </div>
  );
}

export default GoogleMapChangeTheme;

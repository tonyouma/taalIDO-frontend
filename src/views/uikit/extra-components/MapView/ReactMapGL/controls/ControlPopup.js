import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Popup } from 'react-map-gl';
import { makeStyles } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => {
  const isRTL = theme.direction === 'rtl';

  return {
    root: {
      '& .mapboxgl-popup-content': {
        padding: theme.spacing(1),
        boxShadow: theme.shadows[25].z20,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.grey[800]
      },
      '& .mapboxgl-popup-close-button': {
        width: 24,
        height: 24,
        fontSize: 16,
        opacity: 0.48,
        color: theme.palette.common.white,
        right: isRTL && '0',
        left: isRTL && 'auto',
        '&:hover': {
          opacity: 1
        },
        '&:focus': {
          outline: 'none'
        }
      },
      '&.mapboxgl-popup-anchor-top .mapboxgl-popup-tip': {
        marginBottom: -1,
        borderBottomColor: theme.palette.grey[800]
      },
      '&.mapboxgl-popup-anchor-right .mapboxgl-popup-tip': {
        marginLeft: -1,
        borderLeftColor: theme.palette.grey[800]
      },
      '&.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip': {
        marginTop: -1,
        borderTopColor: theme.palette.grey[800]
      },
      '&.mapboxgl-popup-anchor-left .mapboxgl-popup-tip': {
        marginRight: -1,
        borderRightColor: theme.palette.grey[800]
      }
    }
  };
});

// ----------------------------------------------------------------------

ControlPopup.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
  className: PropTypes.string
};

function ControlPopup({ children, onClose, className, ...other }) {
  const classes = useStyles();

  return (
    <Popup
      tipSize={8}
      anchor="bottom"
      onClose={onClose}
      closeButton={true}
      closeOnClick={false}
      className={clsx(classes.root, className)}
      {...other}
    >
      {children}
    </Popup>
  );
}

export default ControlPopup;

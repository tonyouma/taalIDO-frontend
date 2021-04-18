import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
// ----------------------------------------------------------------------

Logo.propTypes = {
  className: PropTypes.string
};

function Logo({ className, ...other }) {
  const { auth, profile } = useSelector((state) => state.firebase);
  const { themeMode } = useSelector((state) => state.settings);

  const length = String(className).split(' ').length;
  let logoFile;

  if (themeMode === 'light') {
    if (length > 1 || className === undefined) {
      if (other.footer === 'true') {
        logoFile = '/static/brand/logo_w/logo_single.svg';
      } else {
        logoFile = '/static/brand/logo_b/logo_single.svg';
      }
    } else {
      logoFile = '/static/brand/logo_w/logo_single.svg';
    }
  } else {
    logoFile = '/static/brand/logo_w/logo_single.svg';
  }

  return (
    <Box
      component="img"
      alt="logo"
      src={logoFile}
      height={40}
      className={className}
      {...other}
    />
  );
}

export default Logo;

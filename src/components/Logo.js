import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

Logo.propTypes = {
  className: PropTypes.string
};

function Logo({ className, ...other }) {
  let logoFile;
  if (className === 'makeStyles-root-15') {
    logoFile = '/static/brand/logo_w/logo_single.svg';
  } else {
    logoFile = '/static/brand/logo_b/logo_single.svg';
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

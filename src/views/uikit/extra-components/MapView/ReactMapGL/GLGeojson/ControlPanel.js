import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Slider, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 99,
    minWidth: 200,
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    padding: theme.spacing(2),
    backdropFilter: 'blur(8px)',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.grey[900], 0.8)
  }
}));

// ----------------------------------------------------------------------

ControlPanel.propTypes = {
  year: PropTypes.number,
  onChange: PropTypes.func,
  className: PropTypes.string
};

function ControlPanel({ year, onChange, className, ...other }) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <Typography variant="body2" sx={{ color: 'common.white' }}>
        Year: {year}
      </Typography>
      <Slider
        name="year"
        value={year}
        step={1}
        min={1995}
        max={2015}
        onChange={onChange}
        {...other}
      />
    </div>
  );
}

export default ControlPanel;

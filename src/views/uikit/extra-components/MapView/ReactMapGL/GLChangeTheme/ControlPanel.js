import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { alpha, makeStyles } from '@material-ui/core/styles';
import {
  Radio,
  Typography,
  RadioGroup,
  FormControlLabel
} from '@material-ui/core';

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
  themes: PropTypes.object,
  selectTheme: PropTypes.string,
  onChangeTheme: PropTypes.func,
  className: PropTypes.string
};

function ControlPanel({
  themes,
  selectTheme,
  onChangeTheme,
  className,
  ...other
}) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <Typography
        gutterBottom
        variant="subtitle2"
        sx={{ color: 'common.white' }}
      >
        Select Theme:
      </Typography>
      <RadioGroup value={selectTheme} onChange={onChangeTheme} {...other}>
        {Object.keys(themes).map((item) => (
          <FormControlLabel
            key={item}
            value={item}
            control={<Radio size="small" />}
            label={item}
            sx={{ color: 'common.white', textTransform: 'capitalize' }}
          />
        ))}
      </RadioGroup>
    </div>
  );
}

export default ControlPanel;

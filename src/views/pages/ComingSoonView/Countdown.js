import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center'
  },
  margin: {
    margin: theme.spacing(0, 1),
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(0, 2.5)
    }
  }
}));

// ----------------------------------------------------------------------

Countdown.propTypes = {
  countdown: PropTypes.object,
  className: PropTypes.string
};

function Countdown({ countdown, className }) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <div>
        <Typography variant="h2">{countdown.days}</Typography>
        <Typography sx={{ color: 'text.secondary' }}>Days</Typography>
      </div>

      <Typography variant="h2" className={classes.margin}>
        :
      </Typography>

      <div>
        <Typography variant="h2">{countdown.hours}</Typography>
        <Typography sx={{ color: 'text.secondary' }}>Hours</Typography>
      </div>

      <Typography variant="h2" className={classes.margin}>
        :
      </Typography>

      <div>
        <Typography variant="h2">{countdown.minutes}</Typography>
        <Typography sx={{ color: 'text.secondary' }}>Minutes</Typography>
      </div>

      <Typography variant="h2" className={classes.margin}>
        :
      </Typography>

      <div>
        <Typography variant="h2">{countdown.seconds}</Typography>
        <Typography sx={{ color: 'text.secondary' }}>Seconds</Typography>
      </div>
    </div>
  );
}

export default Countdown;

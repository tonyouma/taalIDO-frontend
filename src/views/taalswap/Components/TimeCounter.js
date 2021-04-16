import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Box, Card, Typography } from '@material-ui/core';
import { useTheme, alpha, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(3),
    color: theme.palette.info.darker
    // backgroundColor: theme.palette.info.lighter

    // height: '160px'
  },
  countdownWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },

  countdownItem: {
    color: theme.palette.text.primary,
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: '2px',
    position: 'relative',
    width: '50px',
    '& span': {
      color: theme.palette.info.darker,
      fontSize: '10px',
      fontWeight: '600',
      textTransform: 'uppercase'
    }
  }
}));

const TimeCounter = ({ timeTillDate, endFlag, poolStatus, timeFormat }) => {
  const classes = useStyles();
  const [state, setState] = useState({
    // days: undefined,
    // hours: undefined,
    // minutes: undefined,
    // seconds: undefined
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  const then = moment(timeTillDate, timeFormat);
  const now = moment();

  useEffect(() => {
    console.log(`poolStatus : ${poolStatus}`);
    if (endFlag === false) {
      console.log('....in');
      const interval = setInterval(() => {
        const countdown = moment(then - now);
        const days = countdown.format('DD');
        const hours = countdown.format('HH');
        const minutes = countdown.format('mm');
        const seconds = countdown.format('ss');

        setState({ days, hours, minutes, seconds });
      }, 1000);
      return () => clearInterval(interval);
    } else {
      console.log('....end');
      setState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
    }
  }, [timeTillDate]);
  return (
    <>
      {endFlag === false ? (
        <Box>
          <div className={classes.countdownWrapper}>
            {state.days && (
              <Box className={classes.countdownItem}>
                {state.days}
                <span>days</span>
              </Box>
            )}
            {state.hours && (
              <Box className={classes.countdownItem}>
                {state.hours}
                <span>hours</span>
              </Box>
            )}
            {state.minutes && (
              <Box className={classes.countdownItem}>
                {state.minutes}
                <span>min</span>
              </Box>
            )}
            {state.seconds && (
              <Box className={classes.countdownItem}>
                {state.seconds}
                <span>sec</span>
              </Box>
            )}
          </div>
        </Box>
      ) : (
        <Box>
          <div className={classes.countdownWrapper}>
            <Box className={classes.countdownItem}>
              00
              <span>days</span>
            </Box>

            <Box className={classes.countdownItem}>
              00
              <span>hours</span>
            </Box>

            <Box className={classes.countdownItem}>
              00
              <span>min</span>
            </Box>

            <Box className={classes.countdownItem}>
              00
              <span>sec</span>
            </Box>
          </div>
        </Box>
      )}
    </>
  );
};

export default TimeCounter;

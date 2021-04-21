import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Box, Card, Typography } from '@material-ui/core';
import { useTheme, alpha, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.warning.main
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
    width: '40px',
    '& span': {
      fontSize: '10px',
      fontWeight: '600',
      textTransform: 'uppercase'
    }
  }
}));

const TimeCounter = ({ timeTillDate, endFlag, poolStatus, timeFormat }) => {
  const classes = useStyles();
  const [days, setDays] = useState('00');
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');

  useEffect(() => {
    try {
      if (endFlag === false) {
        const interval = setInterval(() => {
          const then = moment(timeTillDate);
          const now = moment();

          setDays(timeTillDate.diff(now, 'days'));
          setHours(moment.duration(then.diff(now)).hours());
          setMinutes(moment.duration(then.diff(now)).minutes());
          setSeconds(moment.duration(then.diff(now)).seconds());
        }, 1000);
        return () => clearInterval(interval);
      }
    } catch (error) {
      console.log(error);
    }
  }, [timeTillDate]);

  return (
    <>
      {endFlag === false ? (
        <Box>
          <div className={classes.countdownWrapper}>
            <Box className={classes.countdownItem}>
              {days}
              <span>DD</span>
            </Box>
            :
            <Box className={classes.countdownItem}>
              {hours}
              <span>HH</span>
            </Box>
            :
            <Box className={classes.countdownItem}>
              {minutes}
              <span>MM</span>
            </Box>
            :
            <Box className={classes.countdownItem}>
              {seconds}
              <span>SS</span>
            </Box>
          </div>
        </Box>
      ) : (
        <Box>
          <div className={classes.countdownWrapper}>
            <Box className={classes.countdownItem}>
              00
              <span>DD</span>
            </Box>
            :
            <Box className={classes.countdownItem}>
              00
              <span>HH</span>
            </Box>
            :
            <Box className={classes.countdownItem}>
              00
              <span>MM</span>
            </Box>
            :
            <Box className={classes.countdownItem}>
              00
              <span>SS</span>
            </Box>
          </div>
        </Box>
      )}
    </>
  );
};

export default TimeCounter;

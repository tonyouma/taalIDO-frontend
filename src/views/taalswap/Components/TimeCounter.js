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
    days: undefined,
    hours: undefined,
    minutes: undefined,
    seconds: undefined
  });

  const then = moment(timeTillDate, timeFormat);
  const now = moment();

  const countdown = moment(then - now);
  console.log(`then : ${then.format('MM DD YYYY, hh:mm ss')} , ${then}`);
  console.log(`now  : ${now.format('MM DD YYYY, hh:mm ss')} , ${now}`);

  const days = countdown.format('DD');
  const hours = countdown.format('HH');
  const minutes = countdown.format('mm');
  const seconds = countdown.format('ss');

  // var difftIME = {
  //   days = moment.duration(then.diff(now)).asDays();
  //   hours = moment.duration(then.diff(now)).();
  //   minutes = moment.duration(then.diff(now)).asDays();
  //   seconds = moment.duration(then.diff(now)).asDays();
  // }
  // const days = moment.duration(then.diff(now)).days();
  // const hours = moment.duration(then.diff(now)).hours();
  // const minutes = moment.duration(then.diff(now)).minutes();
  // const seconds = moment.duration(then.diff(now)).seconds();

  useEffect(() => {
    try {
      if (endFlag === false) {
        const interval = setInterval(() => {
          setState({ days, hours, minutes, seconds });
        }, 1000);
        return () => clearInterval(interval);
      } else {
        setState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
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
            {days && (
              <Box className={classes.countdownItem}>
                {days}
                <span>days</span>
              </Box>
            )}
            {hours && (
              <Box className={classes.countdownItem}>
                {hours}
                <span>hours</span>
              </Box>
            )}
            {minutes && (
              <Box className={classes.countdownItem}>
                {minutes}
                <span>min</span>
              </Box>
            )}
            {seconds && (
              <Box className={classes.countdownItem}>
                {seconds}
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

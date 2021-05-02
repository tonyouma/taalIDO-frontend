import clsx from 'clsx';
import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { useTheme, alpha, makeStyles } from '@material-ui/core/styles';
import { Box, Card, Typography } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import Taalswap from 'src/utils/taalswap';
import { PoolStatus } from 'src/utils/poolStatus';
import { getPoolStatus } from '../../../utils/getPoolStatus';
import { useTranslation } from 'react-i18next';
import TimeCounter from 'src/views/taalswap/Components/TimeCounter';
import moment from 'moment';
import outlineWatchLater from '@iconify-icons/ic/outline-watch-later';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    color: theme.palette.text.primary
  },
  trending: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(0.5)
  },
  trendingIcon: {
    color: theme.palette.warning.main
  },
  isTrendingDown: {
    color: theme.palette.error.main,
    backgroundColor: alpha(theme.palette.error.main, 0.16)
  }
}));

// ----------------------------------------------------------------------

function Countdown({ className, pool, value, ...other }) {
  const classes = useStyles();
  const { i18n, t } = useTranslation();
  const context = useWeb3React();
  const theme = useTheme();
  const { library, account } = context;
  const { from } = useSelector((state) => state.talken);

  const [timeTillDate, setTimeTillDate] = useState('');
  const [endFlag, setEndFlag] = useState(true);
  const [poolStatus, setPoolStatus] = useState('');

  useEffect(async () => {
    try {
      // if (!!library || from) {
      let taalswap;
      if (!!library) {
        taalswap = new Taalswap({
          application: pool,
          account,
          library
        });
      } else {
        taalswap = new Taalswap({
          application: pool,
          notConnected: true
        });
      }

      const status = await getPoolStatus(
        taalswap,
        pool.status,
        pool.minFundRaise
      );

      setPoolStatus(status);

      if (status === PoolStatus.LIVE) {
        const endEpoch = moment.unix(pool.endDate);
        setEndFlag(false);
        setTimeTillDate(endEpoch);
      } else if (status === PoolStatus.UPCOMING) {
        const startEpoch = moment.unix(pool.startDate);

        setEndFlag(false);
        setTimeTillDate(startEpoch);
      } else {
        setEndFlag(true);
      }
      // } else {
      //   setEndFlag(true);
      // }
    } catch (error) {
      console.log(error);
    }
  }, [library, value]);

  let poolStatusStr;
  switch (poolStatus) {
    case 'Candidate':
    case 'Approved':
    case 'Deployed':
      poolStatusStr = t('taalswap.poolStProcess');
      break;
    case 'Upcoming':
      poolStatusStr = t('taalswap.poolStReady');
      break;
    case 'Paused':
      poolStatusStr = t('taalswap.poolStPaused');
      break;
    case 'Soldout':
      poolStatusStr = t('taalswap.poolStSoldout');
      break;
    case 'failed':
    case 'Accomplished':
      poolStatusStr = t('taalswap.poolStDone');
      break;
  }

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <Typography marginBottom="10px" variant="subtitle2">
        {t('taalswap.CountDown')}
      </Typography>

      <Box display="flex" justifyContent="space-between">
        <Box style={{ marginTop: '13px' }}>
          {poolStatus === PoolStatus.LIVE ||
          poolStatus === PoolStatus.UPCOMING ? (
            <TimeCounter
              timeTillDate={timeTillDate}
              endFlag={endFlag}
              color={theme.palette.info.darker}
              poolStatus={poolStatus}
            />
          ) : (
            <Typography variant="h4"> {poolStatusStr}</Typography>
          )}
        </Box>
        <Box style={{ marginTop: '-17px', marginBottom: '10px' }}>
          <Icon
            className={classes.trendingIcon}
            icon={outlineWatchLater}
            width={60}
            height={60}
          />
        </Box>
      </Box>
    </Card>
  );
}

export default Countdown;

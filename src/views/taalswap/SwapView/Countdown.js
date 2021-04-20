import clsx from 'clsx';

import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { fNumber, fPercent } from 'src/utils/formatNumber';
import trendingUpFill from '@iconify-icons/eva/trending-up-fill';
import trendingDownFill from '@iconify-icons/eva/trending-down-fill';
import { useTheme, alpha, makeStyles } from '@material-ui/core/styles';
import { Box, Card, Typography } from '@material-ui/core';
import baselineHistory from '@iconify-icons/ic/baseline-history';
import AnimatedNumber from 'react-animated-number';
import { useWeb3React } from '@web3-react/core';
import Taalswap from 'src/utils/taalswap';
import { PoolStatus } from 'src/utils/poolStatus';
import { getPoolStatus } from '../../../utils/getPoolStatus';
import { useTranslation } from 'react-i18next';
import TimeCounter from 'src/views/taalswap/Components/TimeCounter';
import moment from 'moment';
import outlineWatchLater from '@iconify-icons/ic/outline-watch-later';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    // minWidth: '335px',
    // display: 'flex',
    // alignItems: 'center',
    padding: theme.spacing(3),
    // color: theme.palette.info.darker
    color: theme.palette.text.primary
    // backgroundColor: theme.palette.info.lighter

    // height: '160px'
  },
  trending: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(0.5)
  },
  trendingIcon: {
    // width: 24,
    // height: 24,
    // display: 'flex',
    // borderRadius: '50%',
    // alignItems: 'center',
    // justifyContent: 'center',
    // marginRight: theme.spacing(1),
    color: theme.palette.warning.main

    // backgroundColor: alpha(theme.palette.primary.main, 0.16)
  },
  isTrendingDown: {
    color: theme.palette.error.main,
    backgroundColor: alpha(theme.palette.error.main, 0.16)
  }
}));

// ----------------------------------------------------------------------

// CurrentProgress.propTypes = {
//   className: PropTypes.string
// };

function Countdown({ className, pool, value, ...other }) {
  const classes = useStyles();
  const { i18n, t } = useTranslation();
  const context = useWeb3React();
  const theme = useTheme();
  const { connector, library, account } = context;

  const [timeTillDate, setTimeTillDate] = useState('');
  const [endFlag, setEndFlag] = useState(true);
  const [poolStatus, setPoolStatus] = useState('');

  useEffect(async () => {
    try {
      let taalswap = null;
      if (!!library) {
        taalswap = new Taalswap({
          application: pool,
          account,
          library
        });

        const status = await getPoolStatus(
          taalswap,
          pool.status,
          pool.minFundRaise
        );
        console.log(`poolStatus : ${status}`);
        setPoolStatus(status);

        var nowEpoch = moment();

        if (status === PoolStatus.LIVE) {
          const endEpoch = moment.unix(pool.endDate);
          setEndFlag(false);
          setTimeTillDate(endEpoch.format('MM DD YYYY, hh:mm a'));
        } else if (status === PoolStatus.UPCOMING) {
          const startEpoch = moment.unix(pool.startDate);

          setEndFlag(false);
          setTimeTillDate(startEpoch.format('MM DD YYYY, hh:mm a'));
        } else {
          setEndFlag(true);
        }
      } else {
        setEndFlag(true);
      }
    } catch (error) {
      console.log(error);
    }
  }, [library, value]);

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
              timeFormat="MM DD YYYY, h:mm a"
              color={theme.palette.info.darker}
              poolStatus={poolStatus}
            />
          ) : (
            <Typography variant="h4"> {poolStatus}</Typography>
          )}
        </Box>
        <Box style={{ marginTop: '-17px', marginBottom: '10px' }}>
          <Icon
            // style={{ marginTop: '-10px' }}
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

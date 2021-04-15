import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, TextField, Divider } from '@material-ui/core';
import getMax from '../../../utils/getMax';
import getProgressValue from '../../../utils/getProgressValue';
import { useWeb3React } from '@web3-react/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import { getPoolStatus } from '../../../utils/getPoolStatus';
import StatusLabel from '../Components/StatusLabel';
import Taalswap from 'src/utils/taalswap';
import Numbers from 'src/utils/Numbers';
import { MLabel } from 'src/theme';
import WeeklySales from './WeeklySales';
import ItemOrders from './ItemOrders';
import Progress from '../../home/LandingPageView/Progress';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(5),
      paddingLeft: theme.spacing(5)
    }
  },
  box: {
    marginTop: '1rem',
    marginBottom: '1rem',
    paddingLeft: '1rem',
    paddingRight: '1rem'
  },
  box2rem: {
    marginTop: '2rem',
    marginBottom: '2rem',
    paddingLeft: '1rem',
    paddingRight: '1rem'
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2.5),
    marginTop: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------
PaymentInformation.propTypes = {
  className: PropTypes.string
};

function PaymentInformation({ className, pool, ethPrice, index }) {
  const classes = useStyles();
  const context = useWeb3React();

  const [progressValue, setProgressValue] = useState(0);
  const [progressDollorValue, setProgressDollorValue] = useState(0);
  const [participants, setParticipants] = useState(0);
  const [poolStatus, setStatus] = useState('');
  const [price, setPrice] = useState(0);

  const { library, account } = context;
  const { i18n, t } = useTranslation();

  useEffect(async () => {
    if (!!library) {
      const taalswap = new Taalswap({
        application: pool,
        account,
        library
      });

      await taalswap
        .getBuyers()
        .then((result) => setParticipants(result.length))
        .catch((error) => console.log(error));
      await taalswap
        .tokensAllocated()
        .then((result) => {
          setProgressValue(getProgressValue(result, pool.tradeAmount));
          setProgressDollorValue((parseFloat(ethPrice) / pool.ratio) * result);
        })
        .catch((error) => console.log(error));

      setStatus(await getPoolStatus(taalswap, pool.status, pool.minFundRaise));
    }
  }, [pool, library, ethPrice]);

  return (
    <div className={clsx(classes.root, className)}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        {t('taalswap.Access')} : {pool.access}
      </Typography>
      <div className={classes.row}>
        <StatusLabel poolStatus={poolStatus} />
      </div>
      <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />
      <Box sx={{ mt: 2, mb: 4 }}>
        <div className={classes.row}>
          <Progress
            progressValue={progressValue}
            progressDollorValue={progressDollorValue}
          />
        </div>
      </Box>
      <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />
      <div className={classes.row}>
        <Typography
          component="p"
          variant="subtitle2"
          sx={{ color: 'text.secondary' }}
        >
          {t('taalswap.Ratio')}
        </Typography>
        <Typography
          component="p"
          variant="body2"
          sx={{ color: 'text.secondary' }}
        >
          {`${Numbers.toFloat(pool.ratio)} ${pool.symbol} = 1 ETH`}
        </Typography>
      </div>
      <div className={classes.row}>
        <Typography
          component="p"
          variant="subtitle2"
          sx={{ color: 'text.secondary' }}
        >
          {t('taalswap.Price')} ($)
        </Typography>
        <Typography
          component="p"
          variant="body2"
          sx={{ color: 'text.secondary' }}
        >
          {`$ ${Numbers.toFloat(parseFloat(ethPrice) / pool.ratio)} / ${
            pool.symbol
          }`}
        </Typography>
      </div>
      <div className={classes.row}>
        <Typography
          component="p"
          variant="subtitle2"
          sx={{ color: 'text.secondary' }}
        >
          {t('taalswap.MaxAllocationIn')} {pool.symbol}
        </Typography>
        <Typography
          component="p"
          variant="bohdy2"
          sx={{ color: 'text.secondary' }}
        >
          {`${Numbers.toFloat(pool.maxIndividuals)} ${pool.symbol}`}
        </Typography>
      </div>
      <div className={classes.row}>
        <Typography
          component="p"
          variant="subtitle2"
          sx={{ color: 'text.secondary' }}
        >
          {t('taalswap.MaxAllocationInETH')}
        </Typography>
        <Typography
          component="p"
          variant="bohdy2"
          sx={{ color: 'text.secondary' }}
        >
          {`${Numbers.toFloat(
            getMax(pool.maxIndividuals, pool.tradeValue)
          )} ETH`}
        </Typography>
      </div>
      <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />
      <div className={classes.row}>
        <Typography component="p" variant="h4" sx={{ color: 'text.secondary' }}>
          {t('taalswap.Participants')}
        </Typography>
        <Typography component="p" variant="h4" sx={{ color: 'text.secondary' }}>
          12
        </Typography>
      </div>
      <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />
    </div>
  );
}

export default PaymentInformation;

import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, TextField } from '@material-ui/core';
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
import Progress from './Progress';

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

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

PaymentInformation.propTypes = {
  className: PropTypes.string
};

function PaymentInformation({ className, pool, ethPrice, index }) {
  const classes = useStyles();
  const context = useWeb3React();

  const [progressValue, setProgressValue] = useState(0);
  const [participants, setParticipants] = useState(0);
  const [poolStatus, setStatus] = useState('');
  const [price, setPrice] = useState(0);

  const { library, account } = context;

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
        })
        .catch((error) => console.log(error));

      // ethPrice !== undefined && setPrice(parseFloat(ethPrice) / pool.ratio);

      setStatus(await getPoolStatus(taalswap, pool.status, pool.minFundRaise));
    }
  }, [pool, library]);

  return (
    <div className={clsx(classes.root, className)}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        Access : {pool.access}
      </Typography>
      <div className={classes.row}>
        <StatusLabel poolStatus={poolStatus} />
      </div>
      <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />
      <Box sx={{ mt: 2, mb: 4 }}>
        <div className={classes.row}>
          <Progress />
        </div>
      </Box>
      <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />
      <div className={classes.row}>
        <Typography
          component="p"
          variant="subtitle2"
          sx={{ color: 'text.secondary' }}
        >
          Ratio
        </Typography>
        <Typography
          component="p"
          variant="body2"
          sx={{ color: 'text.secondary' }}
        >
          `${Numbers.toFloat(pool.ratio)} ${pool.symbol} = 1 ETH
        </Typography>
      </div>
      <div className={classes.row}>
        <Typography
          component="p"
          variant="subtitle2"
          sx={{ color: 'text.secondary' }}
        >
          {`Price, $ / ${pool.symbol}`}
        </Typography>
        <Typography
          component="p"
          variant="body2"
          sx={{ color: 'text.secondary' }}
        >
          {`${Numbers.toFloat(parseFloat(ethPrice) / pool.ratio)}`}
        </Typography>
      </div>
      <div className={classes.row}>
        <Typography
          component="p"
          variant="subtitle2"
          sx={{ color: 'text.secondary' }}
        >
          {`Max Allocation in ${pool.symbol}`}
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
          Max Allocation in ETH
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
          Participants
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

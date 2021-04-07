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

function PaymentInformation({ className, pool, index }) {
  const classes = useStyles();
  const context = useWeb3React();

  const [progressValue, setProgressValue] = useState(0);
  const [participants, setParticipants] = useState(0);
  const [poolStatus, setStatus] = useState('');

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
        .then((result) => setParticipants(result.length));
      await taalswap.tokensAllocated().then((result) => {
        setProgressValue(getProgressValue(result, pool.tradeAmount));
      });

      setStatus(await getPoolStatus(taalswap, pool.status, pool.minFundRaise));
    }
  }, [pool, library]);

  return (
    <div className={clsx(classes.root, className)}>
      <StatusLabel poolStatus={poolStatus} />
      <Box className={classes.box2rem} display="flex">
        <div className={classes.row}>
          <Typography variant="h6" component="p">
            Access : {pool.access}
          </Typography>
        </div>
      </Box>
      <Box className={classes.box2rem}>
        <TextField
          label="Ratio"
          variant="standard"
          InputLabelProps={{
            shrink: true
          }}
          fullWidth
          value={`${Numbers.toFloat4(pool.ratio)} ${pool.symbol} = 1 ETH`}
        />
      </Box>
      <Box
        className={classes.box2rem}
        display="flex"
        justifyContent="space-between"
      >
        <TextField
          label="Max. Individuals"
          variant="standard"
          InputLabelProps={{
            shrink: true
          }}
          style={{ width: '49%' }}
          // value={`${getMax(pool.maxIndividuals, pool.tradeValue)} ETH`}
          value={`${Numbers.toFloat4(pool.maxIndividuals)} ${pool.symbol}`}
        />

        <TextField
          label="Maximum"
          variant="standard"
          InputLabelProps={{
            shrink: true
          }}
          style={{ width: '49%' }}
          value={`${Numbers.toFloat4(
            getMax(pool.maxIndividuals, pool.tradeValue)
          )} ETH`}
        />
      </Box>
      <Box
        className={classes.box2rem}
        display="flex"
        justifyContent="space-between"
      >
        <Box width="59%" marginTop={5} sx={{ alignItems: 'center' }}>
          <Typography color="#888888" sx={{ mx: 1 }}>
            Progress
          </Typography>
          <Box marginTop={3}>
            {/* <LinearProgress variant="determinate" /> */}
            <LinearProgressWithLabel value={progressValue} />
          </Box>
        </Box>

        <Box
          width="35%"
          sx={{
            mb: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}
        >
          <Typography
            component="span"
            variant="subtitle2"
            sx={{
              mb: 8,
              color: 'text.secondary'
            }}
          >
            Participants
          </Typography>
          <Typography
            component="span"
            variant="h3"
            sx={{
              mb: 0,
              alignSelf: 'flex-end',
              color: 'text.secondary'
            }}
          >
            {participants}
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

export default PaymentInformation;

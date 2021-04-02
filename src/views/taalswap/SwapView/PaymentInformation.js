import clsx from 'clsx';
import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, TextField } from '@material-ui/core';
import getMax from '../../../utils/getMax';
import getProgressValue from '../../../utils/getProgressValue';
import { MLabel } from 'src/theme';

import { Contract, ContractFactory } from '@ethersproject/contracts';
import { fixedData } from '../../../contracts';
import { tokenData } from '../../../contracts';
import { useWeb3React } from '@web3-react/core';
import Application from 'taalswap-js/src/models';
import LinearProgress from '@material-ui/core/LinearProgress';
// import usePoolStatus from 'src/hooks/usePoolStatus';

import { PoolStatus } from '../../../utils/poolStatus';
import { getPoolStatus } from '../../../utils/getPoolStatus';
import StatusLabel from '../Components/StatusLabel';

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
  // const poolList = usePoolStatus(pool);

  const [progressValue, setProgressValue] = useState(0);
  const [participants, setParticipants] = useState(0);
  const [poolStatus, setStatus] = useState('');

  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error
  } = context;

  useEffect(async () => {
    // console.log(poolList);
    if (!!library) {
      const fixedContract = new Contract(
        pool.contractAddress,
        ContractFactory.getInterface(fixedData.abi),
        library.getSigner(account).connectUnchecked()
      );

      const tokenContract = new Contract(
        pool.tokenContractAddr,
        ContractFactory.getInterface(tokenData.abi),
        library.getSigner(account).connectUnchecked()
      );

      const taalswapApp = new Application({
        test: true,
        mainnet: false,
        account: account
      });

      const swapContract = taalswapApp.getFixedSwapContract({
        tokenAddress: pool.tokenContractAddr,
        decimals: 18,
        contractAddress: pool.contractAddress,
        fixedContract: fixedContract,
        tokenContract: tokenContract
      });

      await swapContract
        .getBuyers()
        .then((result) => {
          setParticipants(result.length);
        })
        .catch((error) => {});

      await swapContract
        .tokensAllocated()
        .then((result) => {
          setProgressValue(getProgressValue(result, pool.tradeAmount));
        })
        .catch((error) => {});

      setStatus(await getPoolStatus(swapContract));
    }
  }, [pool]);

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
          value={`${pool.ratio} ${pool.symbol} = 1 ETH`}
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
          value={`${pool.maxIndividuals} ${pool.symbol}`}
        />

        <TextField
          label="Price"
          variant="standard"
          InputLabelProps={{
            shrink: true
          }}
          style={{ width: '49%' }}
          value={`${getMax(pool.maxIndividuals, pool.tradeValue)} ETH`}
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

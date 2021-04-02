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

import { PoolStatus } from '../../../utils/poolStatus';

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
      // const swapContract = taalswapApp.getFixedSwapContract({tokenAddress : ERC20TokenAddress, decimals : 18});
      const swapContract = taalswapApp.getFixedSwapContract({
        tokenAddress: pool.tokenContractAddr,
        decimals: 18,
        contractAddress: pool.contractAddress,
        fixedContract: fixedContract,
        tokenContract: tokenContract
      });

      swapContract
        .getBuyers()
        .then((result) => {
          setParticipants(result.length);
        })
        .catch((error) => {});

      swapContract
        .tokensAllocated()
        .then((result) => {
          setProgressValue(getProgressValue(result, pool.tradeAmount));
        })
        .catch((error) => {});

      // Pool의 현재 상태 확인
      const isPreStart = await swapContract.isPreStart().catch(() => {});
      const isFunded = await swapContract.isFunded().catch(() => {});
      const isOpen = await swapContract.isOpen().catch(() => {});
      const hasStarted = await swapContract.hasStarted().catch(() => {});
      const hasFinalized = await swapContract.hasFinalized().catch(() => {});
      const hasMinimumRaise = await swapContract
        .hasMinimumRaise()
        .catch(() => {});
      const minimumRaiseAchieved = await swapContract
        .minimumRaiseAchieved()
        .catch(() => {});
      console.log('isOpen :', isPreStart);
      console.log('isOpen :', isOpen);
      console.log('hasStarted :', hasStarted);
      console.log('hasFinalized :', hasFinalized);
      console.log('hasMinimumRaise :', hasMinimumRaise);
      console.log('minimumRaiseAchieved :', minimumRaiseAchieved);

      let poolStatus;
      if (isOpen) {
        poolStatus = PoolStatus.LIVE;
      } else {
        if (isPreStart) {
          if (isFunded) {
            poolStatus = PoolStatus.UPCOMING;
          }
        } else {
          if (hasMinimumRaise) {
            if (minimumRaiseAchieved) {
              // 구매자
              // getMyPurchases(지갑주소)
              // -> return uint256[]
              //    forEach :
              //      redeemTokens(uint256 purchase_id)
              // 판매자
              // withdrawFunds()
              poolStatus = PoolStatus.FILLED.SUCCESS.ACHIEVED;
            } else {
              // 구매자
              // getMyPurchases(지갑주소)
              // -> return uint256[]
              //    forEach :
              //      redeemGivenMinimumGoalNotAchieved(uint256 purchase_id)
              // 판매자
              // withdrawUnsoldTokens()
              poolStatus = PoolStatus.FILLED.FAILED;
            }
          } else {
            poolStatus = PoolStatus.FILLED.SUCCESS.CLOSED;
            // 구매자
            // getMyPurchases(지갑주소)
            // -> return uint256[]
            //    forEach :
            //      redeemTokens(uint256 purchase_id)
            // 판매자
            // withdrawFunds()
            // withdrawUnsoldTokens()
          }
        }
      }
      console.log('Pool Status :', poolStatus);
    }
  }, [pool]);

  return (
    <div className={clsx(classes.root, className)}>
      {pool.status === 'candidate' ? (
        <MLabel color="primary">Candidate</MLabel>
      ) : null}
      {pool.status === 'approved' ? (
        <MLabel color="info">Approved</MLabel>
      ) : null}
      {pool.status === 'deployed' ? (
        <MLabel color="success">Deployed</MLabel>
      ) : null}
      {/*
      <MLabel color="warning">Waring</MLabel>
      <MLabel color="error">Error</MLabel> */}

      <Box className={classes.box2rem} display="flex">
        <div className={classes.row}>
          <Typography variant="h6" component="p">
            Access : {pool.access}
          </Typography>
        </div>
      </Box>
      <Box className={classes.box2rem}>
        <TextField
          label="Trade Value"
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

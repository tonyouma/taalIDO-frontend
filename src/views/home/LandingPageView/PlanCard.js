import clsx from 'clsx';
import React, { useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import StyledEngineProvider from '@material-ui/core/StyledEngineProvider';
import CirculProgress from './CirculProgress';
import { Icon } from '@iconify/react';
import { PATH_APP } from 'src/routes/paths';
import { Link as RouterLink } from 'react-router-dom';
import checkmarkFill from '@iconify-icons/eva/checkmark-fill';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Button, Typography, Box } from '@material-ui/core';
import { MLabel } from 'src/theme';
import getMax from '../../../utils/getMax';
import getProgressValue from '../../../utils/getProgressValue';
import { useHistory } from 'react-router-dom';
import { Contract, ContractFactory } from '@ethersproject/contracts';
import { fixedData } from '../../../contracts';
import { tokenData } from '../../../contracts';
import { useWeb3React } from '@web3-react/core';
import Application from 'taalswap-js/src/models';
import { getPoolStatus } from '../../../utils/getPoolStatus';
import StatusLabel from '../../taalswap/Components/StatusLabel';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    flexDirection: 'column',
    padding: theme.spacing(3),
    [theme.breakpoints.up(414)]: {
      padding: theme.spacing(5)
    }
  }
}));

// ----------------------------------------------------------------------

PlanCard.propTypes = {
  index: PropTypes.number,
  card: PropTypes.object,
  className: PropTypes.string
};

function PlanCard({ pool, index, className }) {
  const classes = useStyles();
  const history = useHistory();
  const context = useWeb3React();

  const [max, setMax] = useState(0);
  const [allocated, setAllocated] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const [totalRaise, setTotalRaise] = useState(0);
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

      await swapContract
        .getBuyers()
        .then((result) => {
          setParticipants(result.length);
        })
        .catch((error) => {
          console.log(error);
        });

      await swapContract
        .tokensAllocated()
        .then((result) => {
          console.log(result);
          setAllocated(result);
          setProgressValue(getProgressValue(result, pool.tradeAmount));
          setTotalRaise(result * pool.tradeValue);
        })
        .catch((error) => {
          console.log(error);
        });

      const status = await getPoolStatus(swapContract);
      console.log(status);
      setStatus(status);
    }

    setMax(getMax(pool.maxIndividuals, pool.tradeValue));
  }, [pool]);

  const onClickDetails = () => {
    console.log(pool);
    history.push({
      pathname: '/app/taalswap/swap',
      state: { selectedPool: pool }
    });
  };

  return (
    <Card className={clsx(classes.root, className)}>
      <StatusLabel poolStatus={poolStatus} absolute />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // justifyContent: 'flex-end',
          my: 2
        }}
      >
        <Box style={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ mx: 1 }}>
            {pool.poolName}
          </Typography>
        </Box>
        <Box style={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ mx: 1 }}>
            {pool.symbol} / ETH
          </Typography>
        </Box>
      </Box>

      <StyledEngineProvider injectFirst>
        <CirculProgress progressValue={progressValue} />
      </StyledEngineProvider>

      <Box component="ul" sx={{ my: 5, width: '100%' }}>
        {/* Ratio */}
        <Box
          key="ratio"
          component="li"
          sx={{
            display: 'flex',
            typography: 'body2',
            // color: item.isAvailable ? 'text.primary' : 'text.disabled',
            '&:not(:last-of-type)': { mb: 2 }
          }}
        >
          <Box
            component={Icon}
            icon={checkmarkFill}
            sx={{ width: 20, height: 20, mr: 1.5 }}
          />
          Ratio
          <Box sx={{ flex: 1 }} />
          {/* page 1-1 오른쪽 정렬 및 텍스트 */}
          <Box sx={{ mr: 1.5 }}>
            <Box sx={{ mr: 1.5 }}>
              {pool.ratio} {pool.symbol} = 1 ETH
            </Box>
          </Box>
        </Box>

        {/* Maximum */}
        <Box
          key="maximum"
          component="li"
          sx={{
            display: 'flex',
            typography: 'body2',
            // color: item.isAvailable ? 'text.primary' : 'text.disabled',
            '&:not(:last-of-type)': { mb: 2 }
          }}
        >
          <Box
            component={Icon}
            icon={checkmarkFill}
            sx={{ width: 20, height: 20, mr: 1.5 }}
          />
          Maximum
          <Box sx={{ flex: 1 }} />
          {/* page 1-1 오른쪽 정렬 및 텍스트 */}
          <Box sx={{ mr: 1.5 }}>
            <Box sx={{ mr: 1.5 }}>{max} ETH</Box>
          </Box>
        </Box>

        {/* Access */}
        <Box
          key="access"
          component="li"
          sx={{
            display: 'flex',
            typography: 'body2',
            // color: item.isAvailable ? 'text.primary' : 'text.disabled',
            '&:not(:last-of-type)': { mb: 2 }
          }}
        >
          <Box
            component={Icon}
            icon={checkmarkFill}
            sx={{ width: 20, height: 20, mr: 1.5 }}
          />
          Access
          <Box sx={{ flex: 1 }} />
          {/* page 1-1 오른쪽 정렬 및 텍스트 */}
          <Box sx={{ mr: 1.5 }}>
            <Box sx={{ mr: 1.5 }}>{!!pool.access && pool.access}</Box>
          </Box>
        </Box>

        {/* Participants */}
        <Box
          key="participants"
          component="li"
          sx={{
            display: 'flex',
            typography: 'body2',
            // color: item.isAvailable ? 'text.primary' : 'text.disabled',
            '&:not(:last-of-type)': { mb: 2 }
          }}
        >
          <Box
            component={Icon}
            icon={checkmarkFill}
            sx={{ width: 20, height: 20, mr: 1.5 }}
          />
          Participants
          <Box sx={{ flex: 1 }} />
          {/* page 1-1 오른쪽 정렬 및 텍스트 */}
          <Box sx={{ mr: 1.5 }}>
            <Box sx={{ mr: 1.5 }}>{participants}</Box>
          </Box>
        </Box>

        {/* Total Raise */}
        <Box
          key="totalraise"
          component="li"
          sx={{
            display: 'flex',
            typography: 'body2',
            // color: item.isAvailable ? 'text.primary' : 'text.disabled',
            '&:not(:last-of-type)': { mb: 2 }
          }}
        >
          <Box
            component={Icon}
            icon={checkmarkFill}
            sx={{ width: 20, height: 20, mr: 1.5 }}
          />
          Total Raise
          <Box sx={{ flex: 1 }} />
          {/* page 1-1 오른쪽 정렬 및 텍스트 */}
          <Box sx={{ mr: 1.5 }}>
            <Box sx={{ mr: 1.5 }}>{totalRaise} ETH</Box>
          </Box>
        </Box>
      </Box>

      <Button
        fullWidth
        size="large"
        variant="contained"
        onClick={onClickDetails}
      >
        Details
      </Button>
    </Card>
  );
}

export default PlanCard;

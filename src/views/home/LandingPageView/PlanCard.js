import clsx from 'clsx';
import React, { useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import StyledEngineProvider from '@material-ui/core/StyledEngineProvider';
import { Icon } from '@iconify/react';
import { PATH_APP } from 'src/routes/paths';
import { Link as RouterLink } from 'react-router-dom';
import checkmarkFill from '@iconify-icons/eva/checkmark-fill';
import { makeStyles } from '@material-ui/core/styles';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import {
  Card,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Divider,
  Checkbox
} from '@material-ui/core';
import { MLabel } from 'src/theme';
import getMax from '../../../utils/getMax';
import getProgressValue from '../../../utils/getProgressValue';
import { useHistory } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { getPoolStatus } from '../../../utils/getPoolStatus';
import StatusLabel from '../../taalswap/Components/StatusLabel';
import CirculProgress from './CirculProgress';
import Taalswap from 'src/utils/taalswap';
import Numbers from 'src/utils/Numbers';
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
  const [progressValue, setProgressValue] = useState(0);
  const [totalRaise, setTotalRaise] = useState(0);
  const [participants, setParticipants] = useState(0);
  const [poolStatus, setStatus] = useState('');
  const [isOpenModal, setOpenModal] = useState(false);
  const [checkWarning, setCheckWarning] = useState(false);
  const [showWarningMessage, setShowWarningMessage] = useState(false);

  const { library, account } = context;

  const handleOpenModal = (row) => {
    setOpenModal(row);
  };

  const handleCloseModal = () => {
    setCheckWarning(false);
    setOpenModal();
  };

  const handleOnClickSwap = () => {
    if (checkWarning) {
      setCheckWarning(false);
      history.push({
        pathname: '/app/taalswap/pools/swap',
        state: { selectedPool: pool }
      });
    } else {
      setShowWarningMessage(true);
    }
  };

  const handleCheckWarningChange = () => {
    setCheckWarning(!checkWarning);
    checkWarning === true
      ? setShowWarningMessage(true)
      : setShowWarningMessage(false);
  };

  useEffect(async () => {
    try {
      if (!!library) {
        const taalswap = new Taalswap({
          application: pool,
          account,
          library,
          tokenContractAddress: pool.tokenContractAddr,
          fixedContractAddress: pool.contractAddress
        });

        await taalswap
          .getBuyers()
          .then((result) => {
            setParticipants(result.length);
          })
          .catch((error) => console.log(error));

        await taalswap
          .tokensAllocated()
          .then((result) => {
            setProgressValue(getProgressValue(result, pool.tradeAmount));
            setTotalRaise(result * pool.tradeValue);
          })
          .catch((error) => console.log(error));

        setStatus(
          await getPoolStatus(taalswap, pool.status, pool.minFundRaise)
        );
      }

      setMax(getMax(pool.maxIndividuals, pool.tradeValue));
    } catch (error) {
      console.log(error);
    }
  }, [pool, library]);

  const onClickDetails = () => {
    setOpenModal(true);
    // history.push({
    //   pathname: '/app/taalswap/pools/swap',
    //   state: { selectedPool: pool }
    // });
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
              {Numbers.toFloat4(pool.ratio)} {pool.symbol} = 1 ETH
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
            <Box sx={{ mr: 1.5 }}>{Numbers.toFloat4(max)} ETH</Box>
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
            <Box sx={{ mr: 1.5 }}>{Numbers.toFloat4(totalRaise)} ETH</Box>
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

      <Dialog
        open={isOpenModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
        style={{ padding: '1rem' }}
      >
        <DialogTitle
          className={classes.dialogTitle}
          id="customized-dialog-title"
          onClose={handleCloseModal}
        >
          <Box display="flex" justifyContent="flex-start">
            <Box>
              <ErrorOutlineOutlinedIcon style={{ color: 'red' }} />
            </Box>
            <Box marginLeft="0.5rem">
              <Typography color="red">Token Safety Alert!</Typography>
            </Box>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Divider />{' '}
          <Box>
            <p>
              Anyone can create an ERC20 token on Ethereum with any name,
              including creating face versions of existing tokens and tokens
              that claim to represent projects but do not exist.
            </p>
            <br />
            <p>
              This interface can load arbitrary tokens by token address. Please
              proceed with utmost caution while you’re interacting with
              arbitrary ERC20 tokens.
            </p>
            <br />
            <p>
              If you purchase an arbitrary token, you may be unable to sell it
              back.
            </p>
          </Box>
          <Divider />
          <Box
            textAlign="right"
            // marginTop="20px"
          >
            <Checkbox
              checked={checkWarning}
              onChange={handleCheckWarningChange}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            I understand
          </Box>
          {showWarningMessage === true && (
            <Box>
              <Typography textAlign="center" color="red">
                You should check to proceed.
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions style={{ height: '60px' }}>
          <Button
            className={classes.button}
            variant="outlined"
            color="inherit"
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            onClick={handleOnClickSwap}
            color="primary"
            autoFocus
          >
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default PlanCard;

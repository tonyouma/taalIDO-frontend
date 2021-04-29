import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import faker from 'faker';
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
import Progress from './Progress';
import getMax from '../../../utils/getMax';
import getProgressValue from '../../../utils/getProgressValue';
import { useHistory } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { getPoolStatus } from '../../../utils/getPoolStatus';
import StatusLabel from '../../taalswap/Components/StatusLabel';
import Taalswap from 'src/utils/taalswap';
import Numbers from 'src/utils/Numbers';
import { MLabel } from 'src/theme';

// import { PoolStatus } from 'src/utils/poolStatus';

// ----------------------------------------------------------------------
const BEST_SALES = [
  {
    name: faker.name.findName(),
    email: faker.internet.email(),
    avatar: '/static/images/avatars/avatar_8.jpg',
    category: 'CAP',
    flag: '/static/icons/ic_flag_de.svg',
    total: faker.finance.amount(),
    rank: 'top_1'
  },
  {
    name: faker.name.findName(),
    email: faker.internet.email(),
    avatar: '/static/images/avatars/avatar_2.jpg',
    category: 'Branded Shoes',
    flag: '/static/icons/ic_flag_en.svg',
    total: faker.finance.amount(),
    rank: 'top_2'
  }
];

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
    },
    '&:hover': {
      boxShadow: `0 0 0 1.5px ${theme.palette.primary.main}`
    }
  }
}));

// ----------------------------------------------------------------------

PlanCard.propTypes = {
  index: PropTypes.number,
  card: PropTypes.object,
  className: PropTypes.string
};

function PlanCard({ pool, ethPrice, index, className }) {
  const classes = useStyles();
  const history = useHistory();
  const context = useWeb3React();

  const [max, setMax] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const [progressDollorValue, setProgressDollorValue] = useState(0);
  const [totalRaise, setTotalRaise] = useState(0);
  const [participants, setParticipants] = useState(0);
  // const [poolStatus, setStatus] = useState('');
  const [isOpenModal, setOpenModal] = useState(false);
  const [checkWarning, setCheckWarning] = useState(false);
  const [showWarningMessage, setShowWarningMessage] = useState(false);

  const { library, account } = context;

  // const handleOpenModal = (row) => {
  //   // setOpenModal(row);
  //   setOpenModal(true);
  // };

  const handleCloseModal = () => {
    setCheckWarning(false);
    setOpenModal(false);
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
      let taalswap = null;
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
          setProgressDollorValue((parseFloat(ethPrice) / pool.ratio) * result);
          setTotalRaise(result * pool.tradeValue);
        })
        .catch((error) => console.log(error));

      // setStatus(await getPoolStatus(taalswap, pool.status, pool.minFundRaise));
      setMax(getMax(pool.maxIndividuals, pool.tradeValue));

      return;
    } catch (error) {
      console.log(error);
      return;
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
    <Card className={clsx(classes.root, className)} id="plan_card">
      <StatusLabel poolStatus={pool.poolStatus} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          my: 2,
          flexWrap: 'wrap'
        }}
        className="cardtitle_wrap"
      >
        <Box
          component="img"
          src={`/static/icons/json-logo.png`}
          sx={{
            width: 32,
            height: 51
          }}
          className="plancard_icon"
        />
        <Typography variant="h3" sx={{ mx: 1 }} className="card_title">
          {pool.poolName}
          <Typography variant="h5" className="card_subtitle">
            50 TALK = 1 ETH
          </Typography>
        </Typography>
      </Box>
      <MLabel
        variant="filled"
        sx={{
          top: 40,
          left: 40,
          position: 'absolute'
        }}
        className="erc_label"
      >
        ERC20
      </MLabel>{' '}
      <Box
        component="ul"
        sx={{ my: 5, width: '100%' }}
        className="plancard_wrap"
      >
        {/* Ratio */}
        {/*<Box
          key="ratio"
          component="li"
          sx={{
            display: 'flex',
            typography: 'body2',
            '&:not(:last-of-type)': { mb: 2 }
          }}
        >
          Ratio
          <Box sx={{ flex: 1 }} />
          <Box sx={{ mr: 1.5 }}>
            <Box sx={{ mr: 1.5 }}>
              {Numbers.toFloat(pool.ratio)} {pool.symbol} = 1 ETH
            </Box>
          </Box>
        </Box>*/}
        {/* Maximum */}
        <Box
          key="maximum"
          component="li"
          sx={{
            display: 'flex',
            typography: 'body2',
            '&:not(:last-of-type)': { mb: 0.7 }
          }}
        >
          <Typography color="#637381" fontSize="0.875rem">
            Maximum
          </Typography>
          <Box sx={{ flex: 1 }} />
          <Box>
            <Box className="text_effect">{Numbers.toFloat(max)} ETH</Box>
          </Box>
        </Box>
        {/* Access */}
        <Box
          key="access"
          component="li"
          sx={{
            display: 'flex',
            typography: 'body2',
            '&:not(:last-of-type)': { mb: 0.7 }
          }}
        >
          <Typography color="#637381" fontSize="0.875rem">
            Access
          </Typography>
          <Box sx={{ flex: 1 }} />
          <Box>
            <Box sx={{ fontSize: '20px' }}>{!!pool.access && pool.access}</Box>
          </Box>
        </Box>
        {/* Participants */}
        <Box
          key="participants"
          component="li"
          sx={{
            display: 'flex',
            typography: 'body2',
            '&:not(:last-of-type)': { mb: 0.7 }
          }}
        >
          <Typography color="#637381" fontSize="0.875rem">
            Participants
          </Typography>
          <Box sx={{ flex: 1 }} />
          <Box>
            <Box sx={{ fontSize: '20px' }}>{participants}</Box>
          </Box>
        </Box>
        {/* Total Raise */}
        <Box
          key="totalraise"
          component="li"
          sx={{
            display: 'flex',
            typography: 'body2',
            '&:not(:last-of-type)': { mb: 0.7 }
          }}
        >
          <Typography color="#637381" fontSize="0.875rem">
            Total Raise
          </Typography>
          <Box sx={{ flex: 1 }} />
          <Box>
            <Box sx={{ color: '#00AB55', fontSize: '20px' }}>
              {Numbers.toFloat(totalRaise)} ETH
            </Box>
          </Box>
        </Box>
        {/* Start Date */}
        <Box
          key="startDate"
          component="li"
          sx={{
            display: 'flex',
            typography: 'body2',
            '&:not(:last-of-type)': { mb: 0.7 }
          }}
          className="start_date"
        >
          <Typography color="#637381" fontSize="0.875rem">
            Start Date
          </Typography>
          <Box sx={{ flex: 1 }} />
          <Box>
            <Box>{moment.unix(pool.startDate).format('YYYY-MM-DD')}</Box>
          </Box>
        </Box>
        {/* End Date */}
        <Box
          key="endDate"
          component="li"
          sx={{
            display: 'flex',
            typography: 'body2',
            '&:not(:last-of-type)': { mb: 0.7 }
          }}
        >
          <Typography color="#637381" fontSize="0.875rem">
            End Date
          </Typography>
          <Box sx={{ flex: 1 }} />
          <Box>
            <Box>{moment.unix(pool.endDate).format('YYYY-MM-DD')}</Box>
          </Box>
        </Box>
      </Box>
      <Progress
        progressValue={progressValue}
        progressDollorValue={progressDollorValue}
      />
      <Box sx={{ my: 1.3 }}></Box>
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
              including creating fake versions of existing tokens and tokens
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

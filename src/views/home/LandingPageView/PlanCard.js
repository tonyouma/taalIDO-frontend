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
import { useHistory } from 'react-router-dom';

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

  const [max, setMax] = useState(0);
  console.log(pool);

  useEffect(() => {
    // setRatio(getRatio(pool.value));
    setMax(getMax(pool.maxIndividuals, pool.tradeValue));
    // setProgressValue(getProgressValue(allocated, pool.sale));
  }, [getMax]);

  const onClickDetails = () => {
    console.log(pool);
    history.push({
      pathname: '/app/taalswap/swap',
      state: { selectedPool: pool }
    });
  };

  return (
    <Card className={clsx(classes.root, className)}>
      {index === 0 && (
        <MLabel
          color="info"
          sx={{
            top: 16,
            right: 16,
            position: 'absolute'
          }}
        >
          Filled
        </MLabel>
      )}
      {index === 1 && (
        <MLabel
          color="gray"
          sx={{
            top: 16,
            right: 16,
            position: 'absolute'
          }}
        >
          Closed
        </MLabel>
      )}
      {index === 2 && (
        <MLabel
          color="gray"
          sx={{
            top: 16,
            right: 16,
            position: 'absolute'
          }}
        >
          Closed
        </MLabel>
      )}

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
            symbol(연동) / ETH
          </Typography>
        </Box>
      </Box>

      <StyledEngineProvider injectFirst>
        <CirculProgress />
      </StyledEngineProvider>

      <Box component="ul" sx={{ my: 5, width: '100%' }}>
        {/* {card.lists.map((item) => (
          <Box
            key={item.text}
            component="li"
            sx={{
              display: 'flex',
              typography: 'body2',
              color: item.isAvailable ? 'text.primary' : 'text.disabled',
              '&:not(:last-of-type)': { mb: 2 }
            }}
          >
            <Box
              component={Icon}
              icon={checkmarkFill}
              sx={{ width: 20, height: 20, mr: 1.5 }}
            />
            {item.text}
            <Box sx={{ flex: 1 }} />
            
            <Box sx={{ mr: 1.5 }}>
              {item.describe.map((item2) => {
                return <Box sx={{ mr: 1.5 }}>{item2}</Box>;
              })}
            </Box>
          </Box>
        ))} */}

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
            <Box sx={{ mr: 1.5 }}>{pool.ratio} ETH = 1 Symbol(연동)</Box>
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
            <Box sx={{ mr: 1.5 }}>0(연동)</Box>
          </Box>
        </Box>
      </Box>

      <Button
        // to={PATH_APP.taalswap.pooldetails}
        // component={RouterLink}
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

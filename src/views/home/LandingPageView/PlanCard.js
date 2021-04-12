import clsx from 'clsx';
import * as React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { PATH_APP } from 'src/routes/paths';
import { Link as RouterLink } from 'react-router-dom';
import checkmarkFill from '@iconify-icons/eva/checkmark-fill';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Button, Typography, Box, Grid } from '@material-ui/core';
import { MLabel } from 'src/theme';
import Progress from './Progress';

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

function PlanCard({ card, index, className }) {
  const classes = useStyles();

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
        component="img"
        src={`/static/icons/json-logo.svg`}
        sx={{
          top: 27,
          left: 32,
          width: 50,
          height: 50,
          position: 'absolute'
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
        <Typography variant="h3" sx={{ mx: 1 }}>
          Protocol
        </Typography>
      </Box>
      <Box component="ul" sx={{ my: 3, width: '100%' }}>
        {card.lists.map((item) => (
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
              //icon={checkmarkFill}
              sx={{ width: 20, height: 20, mr: 1.5 }}
            />
            {item.text}
            <Box sx={{ flex: 1 }} />
            {/* page 1-1 오른쪽 정렬 및 텍스트 */}
            <Box sx={{ mr: 1.1 }}>
              {item.describe.map((item2) => {
                return <Box sx={{ mr: 1.0 }}>{item2}</Box>;
              })}
            </Box>
          </Box>
        ))}
      </Box>
      <Progress />
      <Box sx={{ my: 2 }}></Box>
      <Button
        to={PATH_APP.taalswap.pooldetails}
        fullWidth
        size="large"
        variant="contained"
        component={RouterLink}
      >
        Details
      </Button>
    </Card>
  );
}

export default PlanCard;

import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, TextField, Divider, Grid } from '@material-ui/core';
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

PaymentInformation.propTypes = {
  className: PropTypes.string
};

function PaymentInformation({ className, index }) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        Participant : Public
      </Typography>
      <div className={classes.row}>
        <MLabel color="primary">Candidate</MLabel>
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
          50000 TAL = 11 ETH
        </Typography>
      </div>
      <div className={classes.row}>
        <Typography
          component="p"
          variant="subtitle2"
          sx={{ color: 'text.secondary' }}
        >
          Max Allocation in TAL
        </Typography>
        <Typography
          component="p"
          variant="body2"
          sx={{ color: 'text.secondary' }}
        >
          50000 TAL
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
          0.1 ETH
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

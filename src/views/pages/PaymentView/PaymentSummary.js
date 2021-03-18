import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import shieldFill from '@iconify-icons/eva/shield-fill';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Switch, Divider, Typography } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { MLabel } from 'src/theme';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      height: 'calc(100% - 16px)',
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(5),
      borderRadius: theme.shape.borderRadiusMd,
      backgroundColor:
        theme.palette.grey[theme.palette.mode === 'light' ? 200 : 700]
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5)
    }
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2.5)
  }
}));

// ----------------------------------------------------------------------

PaymentSummary.propTypes = {
  formik: PropTypes.object,
  className: PropTypes.string
};

function PaymentSummary({ formik, className }) {
  const classes = useStyles();
  const { getFieldProps, isSubmitting } = formik;

  return (
    <div className={clsx(classes.root, className)}>
      <Typography variant="subtitle1" sx={{ mb: 5 }}>
        Summary
      </Typography>

      <div className={classes.row}>
        <Typography
          variant="subtitle2"
          component="p"
          sx={{ color: 'text.secondary' }}
        >
          Subscription
        </Typography>
        <MLabel color="error" variant="filled">
          PREMIUM
        </MLabel>
      </div>

      <div className={classes.row}>
        <Typography
          component="p"
          variant="subtitle2"
          sx={{ color: 'text.secondary' }}
        >
          Billed Monthly
        </Typography>
        <Switch {...getFieldProps('isMonthly')} />
      </div>

      <Box sx={{ mb: 2.5, display: 'flex', justifyContent: 'flex-end' }}>
        <Typography sx={{ color: 'text.secondary' }}>$</Typography>
        <Typography variant="h2" sx={{ mx: 1 }}>
          9.99
        </Typography>
        <Typography
          component="span"
          variant="body2"
          sx={{
            mb: 1,
            alignSelf: 'flex-end',
            color: 'text.secondary'
          }}
        >
          /mo
        </Typography>
      </Box>

      <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />

      <Box
        sx={{
          pt: 1.5,
          pb: 2.5,
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="h6" component="p">
          Total Billed
        </Typography>
        <Typography variant="h6" component="p">
          $9.99*
        </Typography>
      </Box>
      <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />

      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        * Plus applicable taxes
      </Typography>

      <Box sx={{ mt: 5, mb: 3 }}>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          pending={isSubmitting}
        >
          Upgrade My Plan
        </LoadingButton>
      </Box>

      <Box sx={{ textAlign: 'center' }}>
        <Typography
          variant="subtitle2"
          sx={{
            mb: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box
            component={Icon}
            icon={shieldFill}
            sx={{ width: 20, height: 20, mr: 1, color: 'primary.main' }}
          />
          Secure credit card payment
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          This is a secure 128-bit SSL encrypted payment
        </Typography>
      </Box>
    </div>
  );
}

export default PaymentSummary;

import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Divider, Typography } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

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

JoninthePool.propTypes = {
  className: PropTypes.string
};

function JoninthePool({ className }) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        Join the Pool
      </Typography>

      <div className={classes.row}>
        <Typography
          variant="subtitle2"
          component="p"
          sx={{ color: 'text.secondary' }}
        >
          0d : 5h : 22m : 51s
        </Typography>
      </div>

      <Box
        sx={{
          pt: 1.5,
          pb: 2.5,
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="h6" component="p">
          Yout Bid Ammount
        </Typography>
        <Typography variant="h6" component="p">
          Blance : 0 BNB
        </Typography>
      </Box>

      <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />

      <div className={classes.row}>
        <Typography
          component="p"
          variant="subtitle2"
          sx={{ color: 'text.secondary' }}
        >
          Bid Ammount
        </Typography>
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

      <Box sx={{ mt: 5, mb: 3 }}>
        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          Go
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
          <Box sx={{ width: 20, height: 20, mr: 1, color: 'primary.main' }} />
          Have problems Joing? Chlick hereto read instructions.
        </Typography>
      </Box>
    </div>
  );
}

export default JoninthePool;

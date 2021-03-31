import clsx from 'clsx';
import React from 'react';
import { Icon } from '@iconify/react';
import shieldFill from '@iconify-icons/eva/shield-fill';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Divider, Typography, TextField } from '@material-ui/core';
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
    marginBottom: theme.spacing(2.5),
    marginTop: theme.spacing(2)
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

      <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />

      <div className={classes.row}>
        <Typography
          component="p"
          variant="subtitle2"
          sx={{ color: 'text.secondary' }}
        >
          Yout Bid Ammount
        </Typography>
        <Typography
          component="p"
          variant="body2"
          sx={{ color: 'text.secondary' }}
        >
          Blance : 0 BNB
        </Typography>
      </div>

      <Box sx={{ mb: 1.5, display: 'flex', justifyContent: 'flex-end' }}>
        <Typography
          component="span"
          variant="subtitle2"
          sx={{
            mb: 1,
            alignSelf: 'flex-end',
            color: 'text.secondary'
          }}
        >
          Price : 0.148 ETH
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
        <Typography variant="h2" sx={{ mx: 1 }}>
          <TextField
            sx={{
              flex: 2 / 5,
              flexWrap: 'wrap'
            }}
            variant="standard"
            InputLabelProps={{
              shrink: true
            }}
            size="small"
            value="0"
            margin="normal"
            inputProps={{
              style: { fontSize: 30, textAlign: 'center' }
            }} // font size of input text
            InputLabelProps={{ style: { fontSize: 0 } }} // font size of input label
          />
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

      <Box sx={{ mt: 2, mb: 3 }}>
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
          <Box
            component={Icon}
            icon={shieldFill}
            sx={{ width: 20, height: 20, mr: 1, color: 'primary.main' }}
          />
          Warning : Balance should be bigger than the price
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Have problems Joing? Chlick hereto read instructions.
        </Typography>
      </Box>
    </div>
  );
}

export default JoninthePool;

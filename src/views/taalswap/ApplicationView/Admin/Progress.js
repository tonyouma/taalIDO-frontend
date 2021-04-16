import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import baselineHistory from '@iconify-icons/ic/baseline-history';
import { fNumber } from 'src/utils/formatNumber';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Box, Card, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    padding: theme.spacing(3),
    color: theme.palette.warning.darker,
    backgroundColor: theme.palette.warning.lighter
  },
  icon: {
    width: 120,
    height: 120,
    opacity: 0.12,
    position: 'absolute',
    right: theme.spacing(-3),
    color: theme.palette.warning.dark,
    backgroundImage: `linear-gradient(135deg, ${alpha(
      theme.palette.warning.dark,
      0
    )} 0%, ${alpha(theme.palette.warning.dark, 0.24)} 100%)`
  }
}));

// ----------------------------------------------------------------------

Progress.propTypes = {
  className: PropTypes.string
};

const TOTAL = 20;

function Progress({ className, ...other }) {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <Box sx={{ ml: 3 }}>
        <Typography variant="h3"> {fNumber(TOTAL)}%</Typography>
        <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
          Progress
        </Typography>
      </Box>
      <Icon icon={baselineHistory} className={classes.icon} />
    </Card>
  );
}

export default Progress;

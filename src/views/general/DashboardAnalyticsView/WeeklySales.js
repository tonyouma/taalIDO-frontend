import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { fShortenNumber } from 'src/utils/formatNumber';
import androidFilled from '@iconify-icons/ant-design/android-filled';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
    textAlign: 'center',
    padding: theme.spacing(5, 0),
    color: theme.palette.primary.darker,
    backgroundColor: theme.palette.primary.lighter
  },
  icon: {
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
    color: theme.palette.primary.dark,
    backgroundImage: `linear-gradient(135deg, ${alpha(
      theme.palette.primary.dark,
      0
    )} 0%, ${alpha(theme.palette.primary.dark, 0.24)} 100%)`
  }
}));

// ----------------------------------------------------------------------

WeeklySales.propTypes = {
  className: PropTypes.string
};

function WeeklySales({ className, ...other }) {
  const classes = useStyles();
  const total = 714000;

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <div className={classes.icon}>
        <Icon icon={androidFilled} width={24} height={24} />
      </div>
      <Typography variant="h3">{fShortenNumber(total)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Weekly Sales
      </Typography>
    </Card>
  );
}

export default WeeklySales;

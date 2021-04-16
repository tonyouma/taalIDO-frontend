import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { fShortenNumber } from 'src/utils/formatNumber';
import windowsFilled from '@iconify-icons/ant-design/windows-filled';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
    textAlign: 'center',
    padding: theme.spacing(5, 0),
    color: theme.palette.warning.darker,
    backgroundColor: theme.palette.warning.lighter
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
    color: theme.palette.warning.dark,
    backgroundImage: `linear-gradient(135deg, ${alpha(
      theme.palette.warning.dark,
      0
    )} 0%, ${alpha(theme.palette.warning.dark, 0.24)} 100%)`
  }
}));

// ----------------------------------------------------------------------

ItemOrders.propTypes = {
  className: PropTypes.string
};

const TOTAL = 1723315;

function ItemOrders({ className, ...other }) {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <div className={classes.icon}>
        <Icon icon={windowsFilled} width={24} height={24} />
      </div>
      <Typography variant="h3">{fShortenNumber(TOTAL)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Item Orders
      </Typography>
    </Card>
  );
}

export default ItemOrders;

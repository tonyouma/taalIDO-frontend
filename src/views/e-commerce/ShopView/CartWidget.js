import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { PATH_APP } from 'src/routes/paths';
import { Link as RouterLink } from 'react-router-dom';
import shoppingCartFill from '@iconify-icons/eva/shopping-cart-fill';
import { makeStyles } from '@material-ui/core/styles';
import { Badge, Box } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    right: 0,
    display: 'flex',
    position: 'fixed',
    alignItems: 'center',
    top: theme.spacing(16),
    height: theme.spacing(5),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(1.25),
    boxShadow: theme.shadows[25].z20,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    borderTopLeftRadius: theme.shape.borderRadiusMd,
    borderBottomLeftRadius: theme.shape.borderRadiusMd,
    transition: theme.transitions.create('opacity'),
    '&:hover': { opacity: 0.72 }
  }
}));

// ----------------------------------------------------------------------

CartWidget.propTypes = {
  length: PropTypes.number.isRequired,
  className: PropTypes.string
};

function CartWidget({ length, className, ...other }) {
  const classes = useStyles();

  return (
    <Box
      component={RouterLink}
      className={clsx(classes.root, className)}
      to={PATH_APP.management.eCommerce.checkout}
      {...other}
    >
      <Badge showZero badgeContent={length} color="error" max={99}>
        <Icon icon={shoppingCartFill} width={24} height={24} />
      </Badge>
    </Box>
  );
}

export default CartWidget;

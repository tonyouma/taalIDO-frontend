import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  listItem: {
    ...theme.typography.body2,
    height: 44,
    textTransform: 'capitalize',
    padding: theme.spacing(0, 2),
    color: theme.palette.text.secondary,
    borderRadius: theme.shape.borderRadius
  },
  isActiveListItem: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    )
  }
}));

// ----------------------------------------------------------------------

NavItem.propTypes = {
  link: PropTypes.object,
  className: PropTypes.string
};

function NavItem({ link, className, ...other }) {
  const classes = useStyles();
  const { href, title, info } = link;

  return (
    <ListItem
      exact
      button
      to={href}
      disableGutters
      component={RouterLink}
      activeClassName={classes.isActiveListItem}
      className={clsx(classes.listItem, className)}
      {...other}
    >
      <ListItemText disableTypography>{title} </ListItemText>

      {info && info}
    </ListItem>
  );
}

export default NavItem;

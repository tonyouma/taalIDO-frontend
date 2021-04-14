import NavItem from './NavItem';
import MenuLinks from './config';
import PropTypes from 'prop-types';
import Logo from 'src/components/Logo';
import { motion } from 'framer-motion';
import {
  varFadeInUp,
  MotionInView,
  varFadeInRight
} from 'src/components/Animate';
//import useAuth from 'src/hooks/useAuth';
import React, { useEffect } from 'react';
import Scrollbars from 'src/components/Scrollbars';
import { PATH_APP, PATH_DOCS } from 'src/routes/paths';
import { Link as RouterLink, useLocation, matchPath } from 'react-router-dom';
import { alpha, makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Link,
  List,
  Drawer,
  Hidden,
  Typography,
  ListSubheader
} from '@material-ui/core';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const useStyles = makeStyles((theme) => {
  const isLight = theme.palette.mode === 'light';

  return {
    drawer: {
      [theme.breakpoints.up('lg')]: {
        flexShrink: 0,
        width: DRAWER_WIDTH
      }
    },
    drawerPaper: {
      width: DRAWER_WIDTH,
      background: theme.palette.background.default
    },
    subHeader: {
      ...theme.typography.subtitle2,
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
      paddingLeft: theme.spacing(5),
      color: theme.palette.text.primary
    },
    account: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(2, 2.5),
      margin: theme.spacing(1, 2.5, 5),
      borderRadius: theme.shape.borderRadiusSm,
      background: theme.palette.grey[isLight ? 200 : 800]
    },
    listIcon: {
      display: 'flex',
      marginBottom: theme.spacing(3),
      marginTop: theme.spacing(0),
      justifyContent: 'center',
      [theme.breakpoints.up('md')]: {
        justifyContent: 'flex-start'
      },
      '& > :not(:last-of-type)': {
        marginRight: theme.spacing(4.5)
      }
    },
    doc: {
      padding: theme.spacing(2.5),
      borderRadius: theme.shape.borderRadiusMd
    }
  };
});

// ----------------------------------------------------------------------

function reduceChild({ array, item, pathname, level }) {
  const key = item.href + level + item.title;

  if (item.items) {
    const match = matchPath(pathname, {
      path: item.href,
      exact: false
    });

    array = [
      ...array,
      <NavItem
        key={key}
        level={level}
        icon={item.icon}
        info={item.info}
        href={item.href}
        title={item.title}
        open={Boolean(match)}
      >
        {renderNavItems({
          pathname,
          level: level + 1,
          items: item.items
        })}
      </NavItem>
    ];
  } else {
    array = [
      ...array,
      <NavItem
        key={key}
        level={level}
        href={item.href}
        icon={item.icon}
        info={item.info}
        title={item.title}
      />
    ];
  }
  return array;
}

function renderNavItems({ items, pathname, level = 0 }) {
  return (
    <List disablePadding>
      {items.reduce(
        (array, item) => reduceChild({ array, item, pathname, level }),
        []
      )}
    </List>
  );
}

NavBar.propTypes = {
  onCloseNav: PropTypes.func,
  isOpenNav: PropTypes.bool
};

function NavBar({ isOpenNav, onCloseNav }) {
  const classes = useStyles();
  const { pathname } = useLocation();
  // const { user } = useAuth();

  useEffect(() => {
    if (isOpenNav && onCloseNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbars>
      <Box sx={{ px: 2.5, py: 3 }}>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
      </Box>

      {/* <Link
        underline="none"
        component={RouterLink}
        to={PATH_APP.management.user.account}
      >
        <div className={classes.account}>
          <MyAvatar />
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
              {user.displayName}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {user.role}
            </Typography>
          </Box>
        </div>
      </Link> */}

      {MenuLinks.map((list, index) => (
        <List
          disablePadding
          // key={list.subheader}
          kue={index}
          subheader={
            <ListSubheader
              disableSticky
              disableGutters
              className={classes.subHeader}
            >
              {list.subheader}
            </ListSubheader>
          }
        >
          {renderNavItems({
            items: list.items,
            pathname: pathname
          })}
        </List>
      ))}

      <Box sx={{ px: 4.5, pb: 3, mt: 60 }}>
        <div className={classes.doc}>
          <Typography
            gutterBottom
            align="center"
            variant="subtitle2"
            sx={{ mb: 1, color: 'text.disabled', display: 'block' }}
          >
            © All rights reserved.
          </Typography>
        </div>
        <div className={classes.listIcon}>
          <a href="">
            <motion.img
              variants={varFadeInRight}
              src="/static/icons/ic_s_facebook.svg"
            />
          </a>
          <a href="">
            <motion.img
              variants={varFadeInRight}
              src="/static/icons/ic_s_linkin.svg"
            />
          </a>
          <a href="">
            <motion.img
              variants={varFadeInRight}
              src="/static/icons/ic_s_instagram.svg"
            />
          </a>
          <a href="https://twitter.com/taalswap" target="_blank">
            <motion.img
              variants={varFadeInRight}
              src="/static/icons/ic_s_tweet.svg"
            />
          </a>
        </div>
      </Box>
    </Scrollbars>
  );

  return (
    <nav className={classes.drawer}>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          open={isOpenNav}
          variant="temporary"
          onClose={onCloseNav}
          classes={{ paper: classes.drawerPaper }}
        >
          {renderContent}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          open
          anchor="left"
          variant="persistent"
          classes={{ paper: classes.drawerPaper }}
        >
          {renderContent}
        </Drawer>
      </Hidden>
    </nav>
  );
}

export default NavBar;

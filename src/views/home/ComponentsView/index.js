import React from 'react';
import Navbar from './NavBar';
import Sections from './Sections';
import Page from 'src/components/Page';
import { motion } from 'framer-motion';
import { PATH_APP } from 'src/routes/paths';
import { getImgComponent } from 'src/utils/getImages';
import { Link as RouterLink } from 'react-router-dom';
import { varFadeInUp, varWrapEnter } from 'src/components/Animate';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Hidden, Container, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const LINKS_ROOT = [
  { name: 'colors', sublinks: [] },
  { name: 'typography', sublinks: [] },
  { name: 'shadows', sublinks: [] },
  { name: 'grid', sublinks: [] },
  { name: 'brand', sublinks: [] },
  { name: 'illustrations', sublinks: [] },
  {
    name: 'UI components',
    sublinks: [
      'accordion',
      'app',
      'appbar',
      'avatar',
      'badge.label',
      'buttons',
      'cards',
      'carousel',
      'chart',
      'chip',
      'dialog',
      'form',
      'navigation',
      'notification',
      'popover.tooltip',
      'progress',
      'selection_controls',
      'table',
      'timeline',
      'upload.editor'
    ]
  }
];

const LINKS = LINKS_ROOT.map((link) => {
  const hasSubMenu = link.sublinks.length > 0;

  if (!hasSubMenu) {
    return {
      title: link.name,
      href: `#${link.name}`,
      leftImage: {
        small: getImgComponent(720, link.name, 'light'),
        medium: getImgComponent(960, link.name, 'light'),
        large: getImgComponent(1200, link.name, 'light')
      },
      rightImage: {
        small: getImgComponent(720, link.name, 'dark'),
        medium: getImgComponent(960, link.name, 'dark'),
        large: getImgComponent(1200, link.name, 'dark')
      }
    };
  }

  return {
    title: link.name,
    href: `#${link.sublinks[0]}`,
    sublinks: link.sublinks.map((name) => {
      return {
        title: name.replace('_', ' ').replace('.', ' & '),
        href: `#${name}`,
        leftImage: {
          small: getImgComponent(720, name, 'light'),
          medium: getImgComponent(960, name, 'light'),
          large: getImgComponent(1440, name, 'light')
        },
        rightImage: {
          small: getImgComponent(720, name, 'dark'),
          medium: getImgComponent(960, name, 'dark'),
          large: getImgComponent(1440, name, 'dark')
        }
      };
    })
  };
});

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100%',
    padding: theme.spacing(20, 0),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(20, 2)
    }
  },
  content: {
    marginTop: theme.spacing(10),
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: 'flex-start'
    }
  }
}));

function ComponentsView() {
  const classes = useStyles();

  return (
    <Page title="Components Overview | Minimal-UI" className={classes.root}>
      <Container maxWidth="lg">
        <motion.div initial="initial" animate="animate" variants={varWrapEnter}>
          <motion.div variants={varFadeInUp}>
            <Typography variant="h3" component="h1" paragraph>
              Components
            </Typography>
          </motion.div>

          <motion.div variants={varFadeInUp}>
            <Typography sx={{ color: 'text.secondary' }} paragraph>
              With huge resource pack making deployment easy and <br />
              Expanding more effectively
            </Typography>
          </motion.div>

          <motion.div variants={varFadeInUp}>
            <Link component={RouterLink} to={PATH_APP.components.root}>
              Learn more
            </Link>
          </motion.div>
        </motion.div>

        <div className={classes.content}>
          <Hidden mdDown>
            <Navbar links={LINKS} />
          </Hidden>
          <Sections links={LINKS} />
        </div>
      </Container>
    </Page>
  );
}

export default ComponentsView;

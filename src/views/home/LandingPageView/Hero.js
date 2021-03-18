import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import LazySize from 'src/components/LazySize';
import { BASE_IMG } from 'src/utils/getImages';
import flashFill from '@iconify-icons/eva/flash-fill';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_APP, PATH_HOME } from 'src/routes/paths';
import {
  varFadeIn,
  varWrapEnter,
  varFadeInUp,
  varFadeInRight
} from 'src/components/Animate';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Box, Link, Container, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    backgroundColor: '#F2F3F5',
    [theme.breakpoints.up('md')]: {
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      display: 'flex',
      position: 'fixed',
      alignItems: 'center'
    }
  },
  content: {
    zIndex: 10,
    maxWidth: 520,
    margin: 'auto',
    textAlign: 'center',
    position: 'relative',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(15),
    [theme.breakpoints.up('md')]: {
      margin: 'unset',
      textAlign: 'left'
    }
  },
  heroOverlay: {
    zIndex: 9,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute'
  },
  heroImg: {
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 8,
    width: '100%',
    margin: 'auto',
    position: 'absolute',
    [theme.breakpoints.up('lg')]: {
      right: '8%',
      width: 'auto',
      height: '72vh'
    }
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(5),
    color: theme.palette.common.white,
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-start'
    }
  },
  listIcon: {
    display: 'flex',
    marginTop: theme.spacing(5),
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-start'
    },
    '& > :not(:last-of-type)': {
      marginRight: theme.spacing(1.5)
    }
  }
}));

// ----------------------------------------------------------------------

const getImg = (width) =>
  `${BASE_IMG}w_${width}/v1611472901/upload_minimal/home/hero.png`;

Hero.propTypes = {
  className: PropTypes.string
};

function Hero({ className }) {
  const classes = useStyles();

  return (
    <>
      <motion.div
        initial="initial"
        animate="animate"
        variants={varWrapEnter}
        className={clsx(classes.root, className)}
      >
        <motion.img
          alt="overlay"
          src="/static/images/overlay.svg"
          variants={varFadeIn}
          className={classes.heroOverlay}
        />

        <LazySize
          component={motion.img}
          noBlur
          noPlaceholder
          alt="hero"
          src={getImg(600)}
          size={`${getImg(600)} 600w, ${getImg(1200)} 960w`}
          variants={varFadeInUp}
          className={classes.heroImg}
        />

        <Container maxWidth="lg">
          <div className={classes.content}>
            <motion.div variants={varFadeInRight}>
              <Typography variant="h1" sx={{ color: 'common.white' }}>
                Start a <br />
                New Project <br /> with
                <Typography
                  component="span"
                  variant="h1"
                  sx={{ color: 'primary.main' }}
                >
                  &nbsp;Minimal
                </Typography>
              </Typography>
            </motion.div>

            <motion.div variants={varFadeInRight}>
              <Box component="p" sx={{ color: 'common.white', py: 5 }}>
                The starting point for your next project based on
                easy-to-customize Material-UI © helps you build apps faster and
                better.
              </Box>
            </motion.div>

            <motion.div variants={varFadeInRight} className={classes.link}>
              <Box
                component="img"
                alt="sketch icon"
                src="/static/icons/ic_sketch.svg"
                sx={{ mr: 1, width: 20, height: 20 }}
              />
              <Link
                color="inherit"
                underline="always"
                href={PATH_HOME.cloud}
                target="_blank"
              >
                Preview in Sketch Cloud
              </Link>
            </motion.div>

            <motion.div variants={varFadeInRight}>
              <Button
                size="large"
                variant="contained"
                component={RouterLink}
                to={PATH_APP.general.dashboard}
                startIcon={<Icon icon={flashFill} width={20} height={20} />}
              >
                Live Preview
              </Button>
            </motion.div>

            <div className={classes.listIcon}>
              <motion.img
                variants={varFadeInRight}
                src="/static/icons/ic_m_sketch.svg"
              />
              <motion.img
                variants={varFadeInRight}
                src="/static/icons/ic_m_figma.svg"
              />
              <motion.img
                variants={varFadeInRight}
                src="/static/icons/ic_m_material.svg"
              />
              <motion.img
                variants={varFadeInRight}
                src="/static/icons/ic_m_react.svg"
              />
              <motion.img
                variants={varFadeInRight}
                src="/static/icons/ic_m_redux.svg"
              />
            </div>
          </div>
        </Container>
      </motion.div>
      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
}

export default Hero;

import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
//import Block from 'src/components/Block';
import { motion } from 'framer-motion';
import Logo from 'src/components/Logo';
import {
  varFadeInUp,
  MotionInView,
  varFadeInRight
} from 'src/components/Animate';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Card,
  List,
  Grid,
  Menu,
  Button,
  ListItem,
  MenuItem,
  Container,
  IconButton,
  CardContent,
  Typography,
  ListItemText
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  // page 3-2 padding 변경
  root: {
    paddingTop: 50,
    paddingBottom: 200,
    backgroundColor: theme.palette.grey[900]
  },
  content: {
    textAlign: 'center',
    position: 'absolute',
    marginBottom: theme.spacing(100),
    [theme.breakpoints.up('md')]: {
      height: '100%',
      marginBottom: '100',
      textAlign: 'left',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start'
    },
    [theme.breakpoints.down('md')]: {
      height: '100%',
      width: '100%',
      marginBottom: '100',
      textAlign: 'left',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
  },
  listIcon: {
    display: 'flex',
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(0),
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-start'
    },
    '& > :not(:last-of-type)': {
      marginRight: theme.spacing(1.5)
    }
  },
  handleOn: { width: 20 }
}));

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30
};

// ----------------------------------------------------------------------

DarkMode.propTypes = {
  className: PropTypes.string
};

function DarkMode({ className }) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const fiiter = true;

  return (
    <div className={clsx(classes.root, className)}>
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Grid container fixed={'true'} spacing={5} direction="row-reverse">
          <Grid item xs={12} md={12}>
            <div className={classes.content}>
              <MotionInView
                variants={varFadeInUp}
                sx={{ color: 'common.white', marginLeft: matches ? 0 : 20 }}
              >
                {/* <Typography variant="h4" paragraph>
                  TaalSwap
                </Typography> */}
                <Logo />
              </MotionInView>
              <MotionInView
                variants={varFadeInUp}
                sx={{
                  color: 'common.white',
                  mb: 3,
                  marginLeft: matches ? 0 : 11
                }}
              >
                <Typography
                  gutterBottom
                  variant="overline"
                  sx={{ color: 'text.disabled', display: 'block' }}
                >
                  © All rights reserved. Made by TaalSwap
                </Typography>
              </MotionInView>
              <div className={classes.listIcon}>
                <a href="">
                  <motion.img
                    variants={varFadeInRight}
                    src="/static/icons/ic_m_facebook.svg"
                  />
                </a>
                <a href="">
                  <motion.img
                    variants={varFadeInRight}
                    src="/static/icons/ic_m_linkin.svg"
                  />
                </a>
                <a href="">
                  <motion.img
                    variants={varFadeInRight}
                    src="/static/icons/ic_m_instagram.svg"
                  />
                </a>
                <a
                  href="https://twitter.com/taalswap"
                  target="_blank"
                  rel="noreferrer"
                >
                  <motion.img
                    variants={varFadeInRight}
                    src="/static/icons/ic_m_tweet.svg"
                  />
                </a>
              </div>
            </div>
          </Grid>
        </Grid>

        {matches ? (
          <Grid container spacing={5} direction="row-reverse">
            <Grid item xs={5} md={2}>
              <div className={classes.content}>
                <Typography
                  gutterBottom
                  variant="overline"
                  sx={{ color: 'text.disabled', display: 'block' }}
                >
                  Developers <br />
                  Developer Hub <br />
                  Developer Hub <br />
                </Typography>
              </div>
            </Grid>
            <Grid item xs={5} md={2}>
              <div className={classes.content}>
                <Typography
                  gutterBottom
                  variant="overline"
                  sx={{ color: 'text.disabled', display: 'block' }}
                >
                  Features <br />
                  USDT Pools <br />
                  TAAL Pools <br />
                  Yield Farming
                </Typography>
              </div>
            </Grid>

            <Grid item xs={5} md={2}>
              <div className={classes.content}>
                <Typography
                  gutterBottom
                  variant="overline"
                  sx={{ color: 'text.disabled', display: 'block' }}
                >
                  About <br />
                  About US <br />
                  {/* Privacy <br />
                  Terms */}
                </Typography>
              </div>
            </Grid>

            {/* <Grid item xs={5} md={2}>
              <div className={classes.content}>
                <Typography
                  gutterBottom
                  variant="overline"
                  sx={{ color: 'text.disabled', display: 'block' }}
                >
                  Support <br />
                  Support Center <br />
                  Support Center <br />
                </Typography>
              </div>
            </Grid> */}
          </Grid>
        ) : (
          <div></div>
        )}
      </Container>
    </div>
  );
}

export default DarkMode;

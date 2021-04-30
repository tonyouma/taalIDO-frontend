import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
//import Block from 'src/components/Block';
import { motion } from 'framer-motion';
import Logo from 'src/components/Logo';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  // page 3-2 padding 변경
  root: {
    textAlign: 'center',
    paddingTop: 50,
    paddingBottom: 20,
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
    marginTop: theme.spacing(3),
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {},
    '& > :not(:last-of-type)': {
      marginRight: theme.spacing(4.5)
    }
  },
  handleOn: { width: 20 }
}));

// ----------------------------------------------------------------------

DarkMode.propTypes = {
  className: PropTypes.string
};

function DarkMode({ className }) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} id="footer_wrap">
      <Container
        maxWidth="lg"
        sx={{ position: 'relative' }}
        className="footer_content"
      >
        <Logo sx={{ mb: 1, mx: 'auto' }} className="footer_logo" />

        <Typography
          color="common.white"
          variant="caption"
          className="footer_caption"
        >
          © All rights reserved. Made by TaalSwap and{' '}
          <a
            href="https://taalswap.gitbook.io/taalswap-documents/taalswap-security"
            target="_blank"
          >
            {' '}
            Audited by HAECHI AUDIT{' '}
          </a>
        </Typography>
        <div className={classes.listIcon} id="footer_iconbox">
          {/* <motion.img src="/static/icons/ic_s_facebook.svg" />
          <motion.img src="/static/icons/ic_s_linkin.svg" />
          <motion.img src="/static/icons/ic_s_instagram.svg" />
          <motion.img src="/static/icons/ic_s_tweet.svg" /> */}
          <a href="">
            <motion.img
              // variants={varFadeInRight}
              src="/static/icons/tweet_icon.png"
            />
          </a>
          <a href="https://t.me/TaalSwapOfficial" target="_blank">
            <motion.img
              // variants={varFadeInRight}
              src="/static/icons/page_icon.png"
            />
          </a>
          <a href="https://medium.com/taalswap" target="_blank">
            <motion.img
              // variants={varFadeInRight}
              src="/static/icons/message_icon.png"
            />
          </a>
        </div>
      </Container>
    </div>
  );
}

export default DarkMode;

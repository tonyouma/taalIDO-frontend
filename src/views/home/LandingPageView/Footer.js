import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import Logo from 'src/components/Logo';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import { Link, Container, Typography } from '@material-ui/core';
// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    padding: theme.spacing(5, 0),
    backgroundColor: theme.palette.grey[900]
  },
  listIcon: {
    display: 'flex',
    marginTop: theme.spacing(3),
    justifyContent: 'center',
    marginRight: theme.spacing(4.5)
  }
}));

// ----------------------------------------------------------------------

Footer.propTypes = {
  className: PropTypes.string
};

function Footer({ className }) {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={clsx(classes.root, className)}>
      <Logo sx={{ mb: 1, mx: 'auto' }} />

      <Typography color="common.white" variant="caption">
        © All rights reserved. Made by TaalSwap.
      </Typography>
      <div className={classes.listIcon}>
        <motion.img src="/static/icons/ic_s_facebook.svg" />
        <motion.img src="/static/icons/ic_s_linkin.svg" />
        <motion.img src="/static/icons/ic_s_instagram.svg" />
        <motion.img src="/static/icons/ic_s_tweet.svg" />
      </div>
    </Container>
  );
}

export default Footer;

import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import Logo from 'src/components/Logo';
import { Link as ScrollLink } from 'react-scroll';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Container, Typography } from '@material-ui/core';
import { motion } from 'framer-motion';
import { BASE_IMG } from 'src/utils/getImages';
import useSettings from 'src/hooks/useSettings';
import {
  varFadeInUp,
  varFadeInDown,
  MotionInView
} from 'src/components/Animate';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing(5, 0)
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
      <div className={classes.heading}>
        <MotionInView variants={varFadeInUp}>
          <Typography
            gutterBottom
            variant="overline"
            align="center"
            sx={{ color: 'text.secondary', display: 'block' }}
          >
            TaalSwap
          </Typography>
        </MotionInView>
        <MotionInView variants={varFadeInDown}>
          <Typography variant="h2" align="center">
            Candidate Pools
          </Typography>
        </MotionInView>
      </div>
    </Container>
  );
}

export default Footer;

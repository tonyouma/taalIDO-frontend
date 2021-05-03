import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Typography } from '@material-ui/core';
import {
  varFadeInUp,
  varFadeInDown,
  MotionInView
} from 'src/components/Animate';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(10)
  },
  content: {
    maxWidth: 520,
    margin: 'auto',
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      textAlign: 'Center',
      position: 'absolute'
    }
  }
}));

// ----------------------------------------------------------------------

const getImg = (width) => `/static/images/multipage.png`;

CleanInterfaces.propTypes = {
  className: PropTypes.string
};

function CleanInterfaces({ className }) {
  const classes = useStyles();

  return (
    <Container
      maxWidth="lg"
      className={clsx(classes.root, className)}
      id="interfaces_wrap"
    >
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
          <Typography
            variant="h2"
            align="center"
            sx={{ mb: 4 }}
            className="cleanlnterfaces_title"
          >
            Fire up your project <br />
            with TaalSwap
          </Typography>
        </MotionInView>

        <MotionInView variants={varFadeInUp} className="multipage_wrap">
          <Box
            component="img"
            alt="multipage"
            src={getImg(600)}
            srcSet={`${getImg(600)} 600w, ${getImg(1200)} 960w, ${getImg(
              1440
            )} 1280w`}
            variants={varFadeInUp}
            sx={{ m: 'auto' }}
            className="multi_bg"
          />
          <div className={classes.listIcon} id="multi_box">
            <Typography className="multi_text">
              Be the first to know about new <br />
              pools and other TaalSwap events.
            </Typography>
            <a
              href="https://twitter.com/taal_fi"
              target="_blank"
              className="icon_btn"
            >
              <img src="/static/icons/gray_twittericon.png" />
            </a>
            <a
              href="https://t.me/TaalSwapOfficial"
              target="_blank"
              className="icon_btn"
            >
              <img src="/static/icons/gray_papericon.png" />
            </a>
            <a
              href="https://medium.com/taalswap"
              target="_blank"
              className="icon_btn"
            >
              <img src="/static/icons/gray_messageicon.png" />
            </a>
          </div>
        </MotionInView>
      </div>
    </Container>
  );
}

export default CleanInterfaces;

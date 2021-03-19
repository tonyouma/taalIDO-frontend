import clsx from 'clsx';
import React from 'react';
import CandidateCard from './CandidateCard';
import Page from 'src/components/Page';
import PropTypes from 'prop-types';
import useBreakpoints from 'src/hooks/useBreakpoints';
import PhoneIcon from '@material-ui/icons/Phone';
import {
  varFadeInUp,
  varFadeInDown,
  MotionInView
} from 'src/components/Animate';
import { alpha, makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Card,
  Typography,
  Container,
  CardContent,
  CardHeader
} from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '90%',
    margin: 'auto',
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    flexDirection: 'column',
    padding: theme.spacing(3),
    [theme.breakpoints.up(414)]: {
      padding: theme.spacing(5)
    }
  }
}));

// ----------------------------------------------------------------------

const PLANS = [
  {
    icon: '/static/icons/ic_plan_free.svg',
    lists: [
      { text: 'Token Contac Address', isAvailable: true },
      { text: 'Website URL', isAvailable: true },
      { text: 'Token Contac Address', isAvailable: true },
      { text: 'Website URL', isAvailable: true },
      { text: 'Token Contac Address', isAvailable: true },
      { text: 'WhitePaper/LitePaper', isAvailable: true }
    ]
  },
  {
    icon: '/static/icons/ic_plan_starter.svg',
    lists: [
      { text: 'Token Contac Address', isAvailable: true },
      { text: 'Website URL', isAvailable: true },
      { text: 'Token Contac Address', isAvailable: true },
      { text: 'Website URL', isAvailable: true },
      { text: 'Token Contac Address', isAvailable: true },
      { text: 'WhitePaper/LitePaper', isAvailable: true }
    ]
  },
  {
    icon: '/static/icons/ic_plan_premium.svg',
    lists: [
      { text: 'Token Contac Address', isAvailable: true },
      { text: 'Website URL', isAvailable: true },
      { text: 'Token Contac Address', isAvailable: true },
      { text: 'Website URL', isAvailable: true },
      { text: 'Token Contac Address', isAvailable: true },
      { text: 'WhitePaper/LitePaper', isAvailable: true }
    ]
  }
];

// ----------------------------------------------------------------------

CandidatePool.propTypes = {
  className: PropTypes.string
};

function CandidatePool({ className }) {
  const classes = useStyles();
  const isDesktop = useBreakpoints('up', 'lg');

  return (
    <Page title="TaalSwap Finance" className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12}>
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
                Candidate Pools <br />
              </Typography>
            </MotionInView>
          </Grid>
        </Grid>
      </Container>
      <Grid container spacing={3}>
        {PLANS.map((card, index) => (
          <Grid item xs={12} md={4} key={card.subscription}>
            <CandidateCard card={card} index={index} />
          </Grid>
        ))}
      </Grid>
    </Page>
  );
}

export default CandidatePool;

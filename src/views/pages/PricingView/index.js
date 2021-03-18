import React from 'react';
import PlanCard from './PlanCard';
import Logo from 'src/components/Logo';
import Page from 'src/components/Page';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Switch, Container, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const PLANS = [
  {
    subscription: 'basic',
    icon: '/static/icons/ic_plan_free.svg',
    price: 0,
    caption: 'forever',
    lists: [
      { text: '3 prototypes', isAvailable: true },
      { text: '3 boards', isAvailable: true },
      { text: 'Up to 5 team members', isAvailable: false },
      { text: 'Advanced security', isAvailable: false },
      { text: 'Permissions & workflows', isAvailable: false }
    ],
    labelAction: 'current plan'
  },
  {
    subscription: 'starter',
    icon: '/static/icons/ic_plan_starter.svg',
    price: 4.99,
    caption: 'saving $24 a year',
    lists: [
      { text: '3 prototypes', isAvailable: true },
      { text: '3 boards', isAvailable: true },
      { text: 'Up to 5 team members', isAvailable: true },
      { text: 'Advanced security', isAvailable: false },
      { text: 'Permissions & workflows', isAvailable: false }
    ],
    labelAction: 'choose starter'
  },
  {
    subscription: 'premium',
    icon: '/static/icons/ic_plan_premium.svg',
    price: 9.99,
    caption: 'saving $124 a year',
    lists: [
      { text: '3 prototypes', isAvailable: true },
      { text: '3 boards', isAvailable: true },
      { text: 'Up to 5 team members', isAvailable: true },
      { text: 'Advanced security', isAvailable: true },
      { text: 'Permissions & workflows', isAvailable: true }
    ],
    labelAction: 'choose premium'
  }
];

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100%',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(10)
  },
  header: {
    top: 0,
    left: 0,
    lineHeight: 0,
    width: '100%',
    position: 'absolute',
    padding: theme.spacing(3, 3, 0),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5, 5, 0)
    }
  }
}));

// ----------------------------------------------------------------------

function PricingView() {
  const classes = useStyles();

  return (
    <Page title="Pricing | Minimal-UI" className={classes.root}>
      <header className={classes.header}>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
      </header>

      <Container maxWidth="lg">
        <Typography variant="h3" align="center" gutterBottom>
          Flexible plans for your
          <br /> community&apos;s size and needs
        </Typography>
        <Typography align="center" sx={{ color: 'text.secondary' }}>
          Choose your plan and make modern online conversation magic
        </Typography>

        <Box sx={{ my: 5 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}
          >
            <Typography variant="overline" sx={{ mr: 1.5 }}>
              MONTHLY
            </Typography>
            <Switch />
            <Typography variant="overline" sx={{ ml: 1.5 }}>
              YEARLY (save 10%)
            </Typography>
          </Box>
          <Typography
            variant="caption"
            align="right"
            sx={{ color: 'text.secondary', display: 'block' }}
          >
            * Plus applicable taxes
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {PLANS.map((card, index) => (
            <Grid item xs={12} md={4} key={card.subscription}>
              <PlanCard card={card} index={index} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Page>
  );
}

export default PricingView;

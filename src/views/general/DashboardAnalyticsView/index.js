import React from 'react';
import Tasks from './Tasks';
import NewUsers from './NewUsers';
import ItemOrders from './ItemOrders';
import BugReports from './BugReports';
import NewsUpdate from './NewsUpdate';
import Page from 'src/components/Page';
import WeeklySales from './WeeklySales';
import WebsiteVisits from './WebsiteVisits';
import CurrentVisits from './CurrentVisits';
import OrderTimeline from './OrderTimeline';
import TrafficBySite from './TrafficBySite';
import CurrentSubject from './CurrentSubject';
import ConversionRates from './ConversionRates';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Container, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

function DashboardAnalyticsView() {
  const classes = useStyles();

  return (
    <Page title="Dashboard Analytics | Minimal-UI" className={classes.root}>
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <WeeklySales />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <NewUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ItemOrders />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <BugReports />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <WebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <CurrentVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <ConversionRates />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <CurrentSubject />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <NewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <OrderTimeline />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <TrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <Tasks />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default DashboardAnalyticsView;

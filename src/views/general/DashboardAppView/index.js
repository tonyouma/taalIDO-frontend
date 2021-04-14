import React from 'react';
import Widgets1 from './Widgets1';
import Widgets2 from './Widgets2';
import Progress from './Progress';
import { HeaderDashboard } from 'src/layouts/Common';
import TopAuthors from './TopAuthors';
import Page from 'src/components/Page';
import BugReports from './BugReports';
import TotalAllocated from './TotalAllocated';
import TotalPurchasers from './TotalPurchasers';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: theme.spacing(5)
  }
}));

// ----------------------------------------------------------------------

function DashboardAppView() {
  const classes = useStyles();

  return (
    <Page title="Swap | TaalSwap" className={classes.root}>
      <Container maxWidth="lg">
        <HeaderDashboard heading="Admin" links={[{ name: 'SubText' }]} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <TotalAllocated />
          </Grid>

          <Grid item xs={12} md={4}>
            <TotalPurchasers />
          </Grid>

          <Grid item xs={12} md={4}>
            <Progress />
          </Grid>
          <Grid item xs={12} md={4}>
            <BugReports />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <TopAuthors />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Widgets1 />
              </Grid>
              <Grid item xs={12}>
                <Widgets2 />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default DashboardAppView;

import React from 'react';
import Welcome from './Welcome';
import Widgets1 from './Widgets1';
import Widgets2 from './Widgets2';
import NewInvoice from './NewInvoice';
import TopAuthors from './TopAuthors';
import Page from 'src/components/Page';
import useAuth from 'src/hooks/useAuth';
import FeaturedApp from './FeaturedApp';
import AreaInstalled from './AreaInstalled';
import TotalDownloads from './TotalDownloads';
import TotalInstalled from './TotalInstalled';
import CurrentDownload from './CurrentDownload';
import TotalActiveUsers from './TotalActiveUsers';
import TopInstalledCountries from './TopInstalledCountries';
import TopRelatedApplications from './TopRelatedApplications';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

function DashboardAppView() {
  const classes = useStyles();
  const { user } = useAuth();

  return (
    <Page title="Dashboard App | Minimal-UI" className={classes.root}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Welcome displayName={user.displayName} />
          </Grid>

          <Grid item xs={12} md={4}>
            <FeaturedApp />
          </Grid>

          <Grid item xs={12} md={4}>
            <TotalActiveUsers />
          </Grid>

          <Grid item xs={12} md={4}>
            <TotalInstalled />
          </Grid>

          <Grid item xs={12} md={4}>
            <TotalDownloads />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <CurrentDownload />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AreaInstalled />
          </Grid>

          <Grid item xs={12} lg={8}>
            <NewInvoice />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <TopRelatedApplications />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <TopInstalledCountries />
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

import React from 'react';
import BarChart from './BarChart';
import PieChart from './PieChart';
import AreaChart from './AreaChart';
import LineChart from './LineChart';
import MixedChart from './MixedChart';
import DonutChart from './DonutChart';
import Page from 'src/components/Page';
import RadarBarChart from './RadarBarChart';
import { PATH_APP } from 'src/routes/paths';
import RadialBarChart from './RadialBarChart';
import ColumnSingleChart from './ColumnSingleChart';
import ColumnStackedChart from './ColumnStackedChart';
import ColumnMultipleChart from './ColumnMultipleChart';
import ColumnNegativeChart from './ColumnNegativeChart';
import { HeaderDashboard } from 'src/layouts/Common';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  Grid,
  Container,
  CardHeader,
  CardContent
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  cardContent: {
    height: 420,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

function Apexcharts() {
  const classes = useStyles();

  return (
    <Page title="Apexcharts-Components | Minimal-UI" className={classes.root}>
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Apexcharts"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Charts', href: PATH_APP.components.chart.root },
            { name: 'Apexcharts' }
          ]}
          moreLink="https://apexcharts.com"
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Area" />
              <CardContent dir="ltr">
                <AreaChart />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Line" />
              <CardContent dir="ltr">
                <LineChart />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Column Single" />
              <CardContent dir="ltr">
                <ColumnSingleChart />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Column Multiple" />
              <CardContent dir="ltr">
                <ColumnMultipleChart />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Column Stacked" />
              <CardContent dir="ltr">
                <ColumnStackedChart />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Column Negative" />
              <CardContent dir="ltr">
                <ColumnNegativeChart />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Bar" />
              <CardContent dir="ltr">
                <BarChart />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Mixed" />
              <CardContent dir="ltr">
                <MixedChart />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Pie" />
              <CardContent className={classes.cardContent}>
                <PieChart />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Donut" />
              <CardContent className={classes.cardContent}>
                <DonutChart />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Radial Bar" />
              <CardContent className={classes.cardContent}>
                <RadialBarChart />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Radar" />
              <CardContent className={classes.cardContent}>
                <RadarBarChart />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default Apexcharts;

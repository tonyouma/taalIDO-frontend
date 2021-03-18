import React from 'react';
import BarRechart from './BarRechart';
import PieRechart from './PieRechart';
import Page from 'src/components/Page';
import AreaRechart from './AreaRechart';
import LineRechart from './LineRechart';
import MixedRechart from './MixedRechart';
import DonutRechart from './DonutRechart';
import RadarRechart from './RadarRechart';
import { PATH_APP } from 'src/routes/paths';
import RadialBarRechart from './RadialBarRechart';
import ColumnSingleRechart from './ColumnSingleRechart';
import ColumnStackedRechart from './ColumnStackedRechart';
import ColumnMultipleRechart from './ColumnMultipleRechart';
import ColumnNegativeRechart from './ColumnNegativeRechart';
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
  root: {}
}));

function Recharts() {
  const classes = useStyles();

  return (
    <Page title="Recharts-Components | Minimal-UI" className={classes.root}>
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Recharts"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Chart', href: PATH_APP.components.chart.root },
            { name: 'Recharts' }
          ]}
          moreLink="https://recharts.org"
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Area" />
              <CardContent dir="ltr">
                <AreaRechart />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Line" />
              <CardContent dir="ltr">
                <LineRechart />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Column Single" />
              <CardContent dir="ltr">
                <ColumnSingleRechart />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Column Multiple" />
              <CardContent dir="ltr">
                <ColumnMultipleRechart />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Column Stacked" />
              <CardContent dir="ltr">
                <ColumnStackedRechart />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Column Negative" />
              <CardContent dir="ltr">
                <ColumnNegativeRechart />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Bar" />
              <CardContent dir="ltr">
                <BarRechart />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Mixed" />
              <CardContent dir="ltr">
                <MixedRechart />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Pie" />
              <CardContent dir="ltr">
                <PieRechart />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Donut" />
              <CardContent dir="ltr">
                <DonutRechart />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Radial Bar" />
              <CardContent dir="ltr">
                <RadialBarRechart />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Radar" />
              <CardContent dir="ltr">
                <RadarRechart />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default Recharts;

import React from 'react';
import Welcome from './Welcome';
import Page from 'src/components/Page';
import NewProducts from './NewProducts';
import ProductSold from './ProductSold';
import SalesProfit from './SalesProfit';
import YearlySales from './YearlySales';
import BestSeller from './BestSalesman';
import TotalBalance from './TotalBalance';
import SaleByGender from './SaleByGender';
import SalesOverview from './SalesOverview';
import LatestProducts from './LatestProducts';
import CurrentBalance from './CurrentBalance';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

function DashboardEcommerceView() {
  const classes = useStyles();

  return (
    <Page title="Dashboard E-commerce | Minimal-UI" className={classes.root}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Welcome />
          </Grid>

          <Grid item xs={12} md={4}>
            <NewProducts />
          </Grid>

          <Grid item xs={12} md={4}>
            <ProductSold />
          </Grid>
          <Grid item xs={12} md={4}>
            <TotalBalance />
          </Grid>
          <Grid item xs={12} md={4}>
            <SalesProfit />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <SaleByGender />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <YearlySales />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <SalesOverview />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <CurrentBalance />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <BestSeller />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <LatestProducts />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default DashboardEcommerceView;

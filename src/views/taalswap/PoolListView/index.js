import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Page from '../../../components/Page';
import { Card, CardHeader, Container, Grid } from '@material-ui/core';
import BasicTable from './BasicTable';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

function PoolListView() {
  const classes = useStyles();

  return (
    <Page title="Taalswap | IDO" className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="All Pools" />
              <BasicTable />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default PoolListView;

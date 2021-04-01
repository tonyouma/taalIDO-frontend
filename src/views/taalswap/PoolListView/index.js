import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { HeaderDashboard } from 'src/layouts/Common';
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
    <Page title="Table-Components | Minimal-UI" className={classes.root}>
      <Container maxWidth="lg">
        <HeaderDashboard heading="IDO Pools" links={[{ name: 'textejfiej' }]} />
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Card>
              <BasicTable />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default PoolListView;

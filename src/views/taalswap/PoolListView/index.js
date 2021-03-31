import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { HeaderDashboard } from 'src/layouts/Common';
import Page from '../../../components/Page';
import { Card, CardHeader, Container, Grid } from '@material-ui/core';
import BasicTable from './BasicTable';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

function PoolListView() {
  const classes = useStyles();
  const { i18n, t } = useTranslation();

  console.log(t('taalswap.allpools'));

  return (
    <Page title="Table-Components | Minimal-UI" className={classes.root}>
      <Container maxWidth="lg">
        <HeaderDashboard
          heading={t('taalswap.allpools')}
          links={[{ name: 'Swap' }]}
        />
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

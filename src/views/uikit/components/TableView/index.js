import React from 'react';
import Page from 'src/components/Page';
import BasicTable from './BasicTable';
import { PATH_APP } from 'src/routes/paths';
import CollapsibleTable from './CollapsibleTable';
import SortingSelecting from './SortingSelecting';
import GroupingFixedHeader from './GroupingFixedHeader';
import { HeaderDashboard } from 'src/layouts/Common';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, Container, CardHeader } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

function TableView() {
  const classes = useStyles();

  return (
    <Page title="Table-Components | Minimal-UI" className={classes.root}>
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Table"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Components', href: PATH_APP.components.root },
            { name: 'Table' }
          ]}
          moreLink="https://next.material-ui.com/components/tables"
        />

        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Basic Table" />
              <BasicTable />
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <SortingSelecting />
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardHeader title="Grouping & FixedHeader" />
              <GroupingFixedHeader />
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardHeader title="Collapsible Table" />
              <CollapsibleTable />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default TableView;

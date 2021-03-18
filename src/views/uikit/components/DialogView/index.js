import React from 'react';
import Page from 'src/components/Page';
import FormDialogs from './FormDialogs';
import AlertDialog from './AlertDialog';
import Block from 'src/components/Block';
import ScrollDialog from './ScrollDialog';
import SimpleDialogs from './SimpleDialogs';
import { PATH_APP } from 'src/routes/paths';
import MaxWidthDialog from './MaxWidthDialog';
import FullScreenDialogs from './FullScreenDialogs';
import TransitionsDialogs from './TransitionsDialogs';
import { HeaderDashboard } from 'src/layouts/Common';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid, Container, CardContent } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

function DialogView() {
  const classes = useStyles();

  return (
    <Page title="Dialog-Components | Minimal-UI" className={classes.root}>
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Dialog"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Components', href: PATH_APP.components.root },
            { name: 'Dialog' }
          ]}
          moreLink="https://next.material-ui.com/components/dialogs"
        />

        <Card>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} md={4}>
                <Block title="Simple">
                  <SimpleDialogs />
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Alerts">
                  <AlertDialog />
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Transitions">
                  <TransitionsDialogs />
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Form">
                  <FormDialogs />
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Full Screen">
                  <FullScreenDialogs />
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Max Width Dialog">
                  <MaxWidthDialog />
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Scrolling Content Dialogs">
                  <ScrollDialog />
                </Block>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}

export default DialogView;

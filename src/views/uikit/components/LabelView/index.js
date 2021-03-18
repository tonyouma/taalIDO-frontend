import React from 'react';
import Page from 'src/components/Page';
import Block from 'src/components/Block';
import { PATH_APP } from 'src/routes/paths';
import { HeaderDashboard } from 'src/layouts/Common';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, Container, CardContent } from '@material-ui/core';
import { MLabel } from 'src/theme';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

function LabelsView() {
  const classes = useStyles();

  return (
    <Page title="Label-Components | Minimal-UI" className={classes.root}>
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Label"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Components', href: PATH_APP.components.root },
            { name: 'Label' }
          ]}
        />

        <Card>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Block title="Filled">
                  <MLabel variant="filled"> Default</MLabel>
                  <MLabel variant="filled" color="primary">
                    Primary
                  </MLabel>
                  <MLabel variant="filled" color="info">
                    Info
                  </MLabel>
                  <MLabel variant="filled" color="success">
                    Success
                  </MLabel>
                  <MLabel variant="filled" color="warning">
                    Waring
                  </MLabel>
                  <MLabel variant="filled" color="error">
                    Error
                  </MLabel>
                </Block>
              </Grid>

              <Grid item xs={12}>
                <Block title="Outlined">
                  <MLabel variant="outlined"> Default</MLabel>
                  <MLabel variant="outlined" color="primary">
                    Primary
                  </MLabel>
                  <MLabel variant="outlined" color="info">
                    Info
                  </MLabel>
                  <MLabel variant="outlined" color="success">
                    Success
                  </MLabel>
                  <MLabel variant="outlined" color="warning">
                    Waring
                  </MLabel>
                  <MLabel variant="outlined" color="error">
                    Error
                  </MLabel>
                </Block>
              </Grid>

              <Grid item xs={12}>
                <Block title="Ghost">
                  <MLabel> Default</MLabel>
                  <MLabel color="primary">Primary</MLabel>
                  <MLabel color="info">Info</MLabel>
                  <MLabel color="success">Success</MLabel>
                  <MLabel color="warning">Waring</MLabel>
                  <MLabel color="error">Error</MLabel>
                </Block>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}

export default LabelsView;

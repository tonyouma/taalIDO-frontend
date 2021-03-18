import React from 'react';
import Filled from './Filled';
import Standard from './Standard';
import Outlined from './Outlined';
import Page from 'src/components/Page';
import { PATH_APP } from 'src/routes/paths';
import { HeaderDashboard } from 'src/layouts/Common';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Container, CardHeader, CardContent } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  margin: {
    marginBottom: theme.spacing(3)
  }
}));

// ----------------------------------------------------------------------

function TextFieldView() {
  const classes = useStyles();

  return (
    <Page title="Text Field-Components | Minimal-UI" className={classes.root}>
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Text Field"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Components', href: PATH_APP.components.root },
            { name: 'Text Field' }
          ]}
          moreLink="https://next.material-ui.com/components/text-fields"
        />

        <Card className={classes.margin}>
          <CardHeader title="Outlined" />
          <CardContent>
            <Outlined />
          </CardContent>
        </Card>

        <Card className={classes.margin}>
          <CardHeader title="Standard" />
          <CardContent>
            <Standard />
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Filled" />
          <CardContent>
            <Filled />
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}

export default TextFieldView;

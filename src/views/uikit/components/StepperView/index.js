import React from 'react';
import Page from 'src/components/Page';
import Block from 'src/components/Block';
import { PATH_APP } from 'src/routes/paths';
import CustomizedStepper from './CustomizedStepper';
import VerticalLinearStepper from './VerticalLinearStepper';
import { HeaderDashboard } from 'src/layouts/Common';
import LinearAlternativeLabel from './LinearAlternativeLabel';
import HorizontalLinearStepper from './HorizontalLinearStepper';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Container, CardContent, CardHeader } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  margin: {
    marginBottom: theme.spacing(3)
  },
  box: {
    width: '100%',
    padding: theme.spacing(3),
    boxShadow: theme.shadows[25].z8,
    borderRadius: theme.shape.borderRadius
  }
}));

// ----------------------------------------------------------------------

function StepperView() {
  const classes = useStyles();

  return (
    <Page title="StepperView-Components | Minimal-UI" className={classes.root}>
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Stepper"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Components', href: PATH_APP.components.root },
            { name: 'Stepper' }
          ]}
          moreLink="https://next.material-ui.com/components/steppers"
        />

        <Card className={classes.margin}>
          <CardHeader title="Horizontal Linear Stepper" />
          <CardContent>
            <Block>
              <div className={classes.box}>
                <HorizontalLinearStepper />
              </div>
            </Block>
          </CardContent>
        </Card>

        <Card className={classes.margin}>
          <CardHeader title="Linear Alternative Label" />
          <CardContent>
            <Block>
              <div className={classes.box}>
                <LinearAlternativeLabel />
              </div>
            </Block>
          </CardContent>
        </Card>

        <Card className={classes.margin}>
          <CardHeader title="Vertical Linear Stepper" />
          <CardContent>
            <Block>
              <div className={classes.box}>
                <VerticalLinearStepper />
              </div>
            </Block>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Customized Stepper" />
          <CardContent>
            <Block>
              <div className={classes.box}>
                <CustomizedStepper />
              </div>
            </Block>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}

export default StepperView;

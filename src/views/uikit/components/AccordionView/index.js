import React from 'react';
import faker from 'faker';
import Simple from './Simple';
import Controlled from './Controlled';
import Page from 'src/components/Page';
import { PATH_APP } from 'src/routes/paths';
import { HeaderDashboard } from 'src/layouts/Common';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Container, CardHeader, CardContent } from '@material-ui/core';

// ----------------------------------------------------------------------

const ACCORDIONS = [...Array(4)].map((accordion, index) => {
  const setIndex = index + 1;
  return {
    value: `panel${setIndex}`,
    heading: `Accordion${setIndex}`,
    subHeading: faker.lorem.slug(),
    detail: faker.lorem.lines()
  };
});

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

function AccordionView() {
  const classes = useStyles();

  return (
    <Page title="Accordion-Components | Minimal-UI" className={classes.root}>
      <Container>
        <HeaderDashboard
          heading="Accordion"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Components', href: PATH_APP.components.root },
            { name: 'Accordion' }
          ]}
          moreLink="https://next.material-ui.com/components/accordion"
        />
        <Card sx={{ mb: 3 }}>
          <CardHeader title="Simple" />
          <CardContent>
            <Simple accordions={ACCORDIONS} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Controlled" />
          <CardContent>
            <Controlled accordions={ACCORDIONS} />
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}

export default AccordionView;

import React from 'react';
import Page from 'src/components/Page';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    align: 'center'
  }
}));

// ----------------------------------------------------------------------

function ApplicationListView() {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="TaalSWap| IDO Application">
      <Container maxWidth="xl">
        <Typography variant="h4" component="h1" paragraph>
          Application List
        </Typography>

        <Typography variant="body1" gutterBottom>
          List 를 만들어야한다.
        </Typography>
      </Container>
    </Page>
  );
}

export default ApplicationListView;

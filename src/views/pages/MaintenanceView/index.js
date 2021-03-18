import React from 'react';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Typography, Container } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(10)
  },
  header: {
    top: 0,
    left: 0,
    lineHeight: 0,
    width: '100%',
    position: 'absolute',
    padding: theme.spacing(3, 3, 0),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5, 5, 0)
    }
  }
}));

// ----------------------------------------------------------------------

function MaintenanceView() {
  const classes = useStyles();

  return (
    <Page title="Maintenance | Minimal-UI" className={classes.root}>
      <header className={classes.header}>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
      </header>

      <Container sx={{ textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          Website currently under maintenance
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          We are currently working hard on this page!
        </Typography>

        <Box
          component="img"
          alt="comingsoon"
          src="/static/illustrations/illustration_maintenance.svg"
          sx={{ width: '100%', maxHeight: 240, my: { xs: 5, sm: 10 } }}
        />

        <Button variant="contained" size="large" component={RouterLink} to="/">
          Go to Home
        </Button>
      </Container>
    </Page>
  );
}

export default MaintenanceView;

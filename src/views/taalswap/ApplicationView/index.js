import React from 'react';
import Page from 'src/components/Page';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Typography } from '@material-ui/core';
import { Icon } from '@iconify/react';
import settings2Fill from '@iconify-icons/eva/settings-2-fill';
import { MIconButton } from '../../../theme';
import { Link as RouterLink } from 'react-router-dom';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    align: 'center'
  }
}));

// ----------------------------------------------------------------------

function DashboardAppView() {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="TaalSWap| IDO Application">
      <Container maxWidth="xl">
        <Typography variant="h4" component="h1" paragraph>
          TaalSwap IDO Governance
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          TaalSwap ultimately pursues a permissions and interoperable IDO
          Platform.
        </Typography>
        <Typography variant="body1" gutterBottom>
          With this goal in mind, TaalSwap initially aims at the perfect match
          of promising projects with strong-willed investors in terms of which
          innovate startups are empowered to realize their ideas and
          technologies. To achieve thus goal, the TaalSwap council is
          responsible for ...
        </Typography>

        <Button
          to="/app/taalswap/application/start"
          variant="contained"
          component={RouterLink}
        >
          Start Your Application
        </Button>
      </Container>
    </Page>
  );
}

export default DashboardAppView;

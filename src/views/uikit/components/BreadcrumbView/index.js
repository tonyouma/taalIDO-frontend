import React from 'react';
import Page from 'src/components/Page';
import Block from 'src/components/Block';
import { PATH_APP } from 'src/routes/paths';
import HomeIcon from '@material-ui/icons/Home';
import GrainIcon from '@material-ui/icons/Grain';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import { HeaderDashboard } from 'src/layouts/Common';
import { makeStyles } from '@material-ui/core/styles';
import {
  Link,
  Card,
  Grid,
  Container,
  Typography,
  CardContent,
  Breadcrumbs
} from '@material-ui/core';
import { MBreadcrumbs } from 'src/theme';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  icon: {
    width: 20,
    height: 20,
    marginRight: theme.spacing(0.5)
  }
}));

// ----------------------------------------------------------------------

function BreadcrumbView() {
  const classes = useStyles();

  return (
    <Page title="Breadcrumbs-Components | Minimal-UI" className={classes.root}>
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Breadcrumbs"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Components', href: PATH_APP.components.root },
            { name: 'Breadcrumbs' }
          ]}
          moreLink="https://next.material-ui.com/components/breadcrumbs"
        />

        <Card>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} md={6}>
                <Block title="Text">
                  <Breadcrumbs>
                    <Link color="inherit" href="#">
                      Material-UI
                    </Link>
                    <Link color="inherit" href="#">
                      Core
                    </Link>
                    <Typography sx={{ color: 'text.primary' }}>
                      Breadcrumb
                    </Typography>
                  </Breadcrumbs>
                </Block>
              </Grid>

              <Grid item xs={12} md={6}>
                <Block title="With Icon">
                  <Breadcrumbs>
                    <Link
                      color="inherit"
                      href="#"
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      <HomeIcon className={classes.icon} />
                      Material-UI
                    </Link>
                    <Link
                      color="inherit"
                      href="#"
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      <WhatshotIcon className={classes.icon} />
                      Core
                    </Link>
                    <Typography
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        color: 'text.primary'
                      }}
                    >
                      <GrainIcon className={classes.icon} />
                      Breadcrumb
                    </Typography>
                  </Breadcrumbs>
                </Block>
              </Grid>

              <Grid item xs={12}>
                <Block title="Customized">
                  <MBreadcrumbs
                    links={[
                      { name: 'Home', href: '#', icon: <HomeIcon /> },
                      { name: 'Link1', href: '#', icon: <WhatshotIcon /> },
                      { name: 'Link2', href: '#', icon: <WhatshotIcon /> },
                      { name: 'Link3', href: '#', icon: <WhatshotIcon /> },
                      { name: 'Link4', href: '#', icon: <WhatshotIcon /> },
                      { name: 'Link5', href: '#', icon: <WhatshotIcon /> }
                    ]}
                  />
                </Block>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}

export default BreadcrumbView;

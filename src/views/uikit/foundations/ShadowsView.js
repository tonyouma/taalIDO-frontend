import React from 'react';
import Page from 'src/components/Page';
import Block from 'src/components/Block';
import { PATH_APP } from 'src/routes/paths';
import { HeaderDashboard } from 'src/layouts/Common';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Container,
  CardContent,
  Typography,
  CardHeader
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  margin: {
    marginBottom: theme.spacing(5)
  },
  wrapper: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(1.5, -1.5, 0)
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(3),
    margin: theme.spacing(1.5),
    width: 'calc((100%/2) - 24px)',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up('sm')]: {
      width: 'calc((100%/4) - 24px)'
    },
    [theme.breakpoints.up('md')]: {
      width: 'calc((100%/6) - 24px)'
    }
  }
}));

// ----------------------------------------------------------------------

function ShadowCard({ variation, shadow }) {
  const classes = useStyles();

  return (
    <Box className={classes.card} sx={{ boxShadow: shadow }}>
      <Typography variant="subtitle1">{variation}</Typography>
    </Box>
  );
}

function ShadowsView() {
  const classes = useStyles();
  const theme = useTheme();
  const systemShadows = theme.shadows.slice(1, theme.shadows.length - 1);
  const customShadows = Object.entries(theme.shadows[25]).slice(
    0,
    Object.entries(theme.shadows[25]).length - 5
  );
  const colorShadows = Object.entries(theme.shadows[25]).slice(
    6,
    Object.entries(theme.shadows[25]).length
  );

  return (
    <Page title="Shadows-Foundations | Minimal-UI" className={classes.root}>
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Shadows"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Foundations', href: PATH_APP.foundations.root },
            { name: 'Shadows' }
          ]}
        />
        <Card className={classes.margin}>
          <CardHeader title="System" />
          <CardContent>
            <Block>
              <div className={classes.wrapper}>
                {systemShadows.map((shadow, index) => (
                  <ShadowCard
                    key={shadow}
                    shadow={shadow}
                    variation={`z${index + 1}`}
                  />
                ))}
              </div>
            </Block>
          </CardContent>
        </Card>

        <Card className={classes.margin}>
          <CardHeader title="Customs" />
          <CardContent>
            <Block>
              <div className={classes.wrapper}>
                {customShadows.map((shadow) => (
                  <ShadowCard
                    key={shadow}
                    shadow={shadow[1]}
                    variation={shadow[0]}
                  />
                ))}
              </div>
            </Block>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Colors" />
          <CardContent>
            <Block>
              <div className={classes.wrapper}>
                {colorShadows.map((shadow) => (
                  <Box
                    key={shadow}
                    sx={{
                      p: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: theme.palette[shadow[0]].contrastText,
                      bgcolor: `${theme.palette[shadow[0]].main} !important`,
                      boxShadow: shadow
                    }}
                    className={classes.card}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {shadow[0]}
                    </Typography>
                  </Box>
                ))}
              </div>
            </Block>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}

export default ShadowsView;

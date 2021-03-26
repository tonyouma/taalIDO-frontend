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
  },
  // page 5-2 문구 크기 늘리기 및 텍스트 녹색 변경
  text: {
    color: theme.palette.primary.main
  }
}));

// ----------------------------------------------------------------------

function DashboardAppView() {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="TaalSWap| IDO Application">
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          component="h1"
          paragraph
          // page 5-1 텍스트 간격 늘리기. 더 늘리고 싶으면 paddingBottom 숫자 늘릴 것.
          sx={{ paddingBottom: 3 }}
        >
          TaalSwap IDO Governance
        </Typography>
        <Typography variant="h6" gutterBottom className={classes.text}>
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

        {/* page 5-3 button 위치 아래로, 하단 button 에서 marginTop : 수치를 조절 */}
        <Button
          to="#"
          variant="contained"
          component={RouterLink}
          sx={{ marginTop: 5 }}
        >
          Start Your Application
        </Button>
      </Container>
    </Page>
  );
}

export default DashboardAppView;

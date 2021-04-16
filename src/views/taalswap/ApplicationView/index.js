import React from 'react';
import Page from 'src/components/Page';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Typography } from '@material-ui/core';
import { Icon } from '@iconify/react';
import settings2Fill from '@iconify-icons/eva/settings-2-fill';
import { MIconButton } from '../../../theme';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
  const { i18n, t } = useTranslation();

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
          {t('taalswap.Governance')}
        </Typography>
        <Typography align="justify" variant="body1" gutterBottom>
          {t('taalswap.GovContent')}
        </Typography>

        {/* page 5-3 button 위치 아래로, 하단 button 에서 marginTop : 수치를 조절 */}
        <Button
          to="/app/taalswap/application/start"
          variant="contained"
          component={RouterLink}
          sx={{ marginTop: 5 }}
        >
          {t('taalswap.FillApplication')}
        </Button>
      </Container>
    </Page>
  );
}

export default DashboardAppView;

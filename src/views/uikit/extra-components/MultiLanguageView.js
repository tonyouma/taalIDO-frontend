import React from 'react';
import Page from 'src/components/Page';
import Block from 'src/components/Block';
import { PATH_APP } from 'src/routes/paths';
import { useTranslation } from 'react-i18next';
import { HeaderDashboard } from 'src/layouts/Common';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Radio,
  Container,
  Typography,
  RadioGroup,
  CardContent,
  FormControlLabel
} from '@material-ui/core';

// ----------------------------------------------------------------------

const LANGS = [
  {
    value: 'en',
    label: 'English',
    icon: '/static/icons/ic_flag_en.svg'
  },
  {
    value: 'de',
    label: 'German',
    icon: '/static/icons/ic_flag_de.svg'
  },
  {
    value: 'fr',
    label: 'French',
    icon: '/static/icons/ic_flag_fr.svg'
  }
];

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

function MultiLanguage() {
  const classes = useStyles();
  const { i18n, t } = useTranslation();

  const langStorage = localStorage.getItem('i18nextLng');
  const currentLang = LANGS.find((_lang) => _lang.value === langStorage);

  const handleChangeLanguage = (newlang) => {
    i18n.changeLanguage(newlang);
  };

  return (
    <Page
      title="Multi Language-Components | Minimal-UI"
      className={classes.root}
    >
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Multi Language"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Multi Language' }
          ]}
          moreLink="https://react.i18next.com"
        />

        <Card>
          <CardContent>
            <RadioGroup
              row
              value={currentLang.value}
              onChange={(event) => handleChangeLanguage(event.target.value)}
            >
              {LANGS.map((lang) => (
                <FormControlLabel
                  key={lang.label}
                  value={lang.value}
                  label={lang.label}
                  control={<Radio />}
                />
              ))}
            </RadioGroup>

            <Block sx={{ mt: 3 }}>
              <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                <Box
                  component="img"
                  alt={currentLang.label}
                  src={currentLang.icon}
                  sx={{ mr: 1 }}
                />
                <Typography variant="h2">{t('demo.title')}</Typography>
              </Box>
              <Typography variant="body1">{t('demo.introduction')}</Typography>
            </Block>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}

export default MultiLanguage;

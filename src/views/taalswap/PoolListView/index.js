import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { capitalCase } from 'change-case';
import { Icon } from '@iconify/react';
import roundAccountBox from '@iconify-icons/ic/round-account-box';
import { HeaderDashboard } from 'src/layouts/Common';
import Page from '../../../components/Page';
import { Tab, Tabs, Card, Container, Grid } from '@material-ui/core';
import BasicTable from './BasicTable';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const ACCOUNT_TABS = [
  {
    value: 'All Pools',
    icon: <Icon icon={roundAccountBox} width={20} height={20} />,
    component: <BasicTable />
  },
  {
    value: 'My Pools',
    icon: <Icon icon={roundAccountBox} width={20} height={20} />,
    component: <BasicTable />
  }
];
const useStyles = makeStyles((theme) => ({
  root: {},
  tabBar: {
    marginBottom: theme.spacing(5)
  }
}));

function PoolListView() {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('All Pools');
  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };
  const { i18n, t } = useTranslation();

  console.log(t('taalswap.allpools'));

  return (
    <Page title="Table-Components | Minimal-UI" className={classes.root}>
      <Container maxWidth="lg">
        <HeaderDashboard
          heading={t('taalswap.allpools')}
          links={[{ name: 'Swap' }]}
        />
        <HeaderDashboard heading="IDO Pools" links={[{ name: 'textejfiej' }]} />
        <Tabs
          value={currentTab}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={handleChangeTab}
          className={classes.tabBar}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              label={capitalCase(tab.value)}
              icon={tab.icon}
              value={tab.value}
            />
          ))}
        </Tabs>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Card>
              <BasicTable />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default PoolListView;

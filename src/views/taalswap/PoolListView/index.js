import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { capitalCase } from 'change-case';
import { Icon } from '@iconify/react';
import roundAccountBox from '@iconify-icons/ic/round-account-box';
import { HeaderDashboard } from 'src/layouts/Common';
import Page from '../../../components/Page';
import {
  Tab,
  Tabs,
  Card,
  Container,
  Grid,
  Box,
  Typography
} from '@material-ui/core';
import BasicTable from './BasicTable';
import { useTranslation } from 'react-i18next';
import MyPools from './MyPools';

// ----------------------------------------------------------------------

const ACCOUNT_TABS = [
  {
    value: 0,
    title: 'All Pools',
    icon: <Icon icon={roundAccountBox} width={20} height={20} />,
    component: <BasicTable />
  },
  {
    value: 1,
    title: 'My Pools',
    icon: <Icon icon={roundAccountBox} width={20} height={20} />,
    component: <MyPools />
  }
];
const useStyles = makeStyles((theme) => ({
  root: {},
  tabBar: {
    marginBottom: theme.spacing(5)
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Card>{children}</Card>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

function PoolListView() {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('All Pools');
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };
  const { i18n, t } = useTranslation();

  console.log(t('taalswap.allpools'));

  return (
    <Page title="Table-Components | Minimal-UI" className={classes.root}>
      <Container maxWidth="lg">
        {/* <HeaderDashboard
          heading={t('taalswap.allpools')}
          links={[{ name: 'Swap' }]}
        /> */}
        <HeaderDashboard heading="IDO Pools" links={[{ name: 'textejfiej' }]} />
        <Tabs
          value={value}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={handleChange}
          className={classes.tabBar}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              label={capitalCase(tab.title)}
              icon={tab.icon}
              value={tab.value}
            />
          ))}
        </Tabs>
        <TabPanel value={value} index={0}>
          <BasicTable />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MyPools />
        </TabPanel>
      </Container>
    </Page>
  );
}

export default PoolListView;

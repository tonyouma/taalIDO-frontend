import React, { useState, useEffect } from 'react';
import faker from 'faker';
import { Icon } from '@iconify/react';
import Page from 'src/components/Page';
import { capitalCase } from 'change-case';
import BasicTable from './BasicTable';
import roundAccountBox from '@iconify-icons/ic/round-account-box';
import { HeaderDashboard } from 'src/layouts/Common';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Card,
  Container,
  CardHeader,
  CardContent,
  Tabs,
  Tab
} from '@material-ui/core';

// ----------------------------------------------------------------------

const ACCOUNT_TABS = [
  {
    value: 'Pool Details',
    icon: <Icon icon={roundAccountBox} width={20} height={20} />,
    component: <BasicTable />
  },
  {
    value: 'About the Project',
    icon: <Icon icon={roundAccountBox} width={20} height={20} />,
    component: <index2 />
  },
  {
    value: 'Your Allocations',
    icon: <Icon icon={roundAccountBox} width={20} height={20} />,
    component: <index2 />
  }
];
const useStyles = makeStyles((theme) => ({
  root: { marginBottom: theme.spacing(5) },
  tabBar: {
    marginBottom: theme.spacing(5)
  }
}));

// ----------------------------------------------------------------------

function PoolDetails() {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('Pool Details');
  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };
  return (
    <Page title="My Pools | TaalSwap" className={classes.root}>
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Pool Details"
          links={[{ name: 'SubText Display Area' }]}
        />

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
        <BasicTable />
      </Container>
    </Page>
  );
}

export default PoolDetails;

import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import Page from 'src/components/Page';
import BasicTable from './BasicTable';
import CollapsibleTable from './CollapsibleTable';
import roundAccountBox from '@iconify-icons/ic/round-account-box';
import SortingSelecting from './SortingSelecting';
import { HeaderDashboard } from 'src/layouts/Common';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Card,
  Container,
  CardHeader,
  Tabs,
  Tab
} from '@material-ui/core';

// ----------------------------------------------------------------------

const ACCOUNT_TABS = [
  {
    value: 'BasicTable',
    icon: <Icon icon={roundAccountBox} width={20} height={20} />,
    component: <BasicTable />
  }
];
const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

function Participate() {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('BasicTable');
  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };
  return (
    <Page title="Table-Components | Minimal-UI" className={classes.root}>
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Protocol"
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
              label={tab.value}
              disableRipple
              key={tab.value}
              icon={tab.icon}
              value={tab.value}
            />
          ))}
        </Tabs>

        <Box display="flex" alignItems="center">
          <Box
            sx={{
              my: 4,
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column'
            }}
            component="img"
            alt="logo"
            src={'/static/icons/wallet_icon01.png'}
            height={30}
          />
          ICON (ICX) $1.691
          <Box color="#ff0000" fontSize={10} marginLeft={1}>
            5.65% ↓
          </Box>
        </Box>

        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Basic Table" />
              <BasicTable />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default Participate;

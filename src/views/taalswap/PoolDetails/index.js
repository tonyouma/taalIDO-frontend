import React, { useState, useEffect } from 'react';
import faker from 'faker';
import { Icon } from '@iconify/react';
import Page from 'src/components/Page';
import { capitalCase } from 'change-case';
import BasicTable from './BasicTable';
import roundAccountBox from '@iconify-icons/ic/round-account-box';
import { HeaderDashboard } from 'src/layouts/Common';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: { marginBottom: theme.spacing(5) },
  tabBar: {
    marginBottom: theme.spacing(5)
  }
}));

// ----------------------------------------------------------------------

function PoolDetails({ pool }) {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('Pool Details');
  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };
  return (
    <Page title="My Pools | TaalSwap" className={classes.root}>
      {/* <Container maxWidth="lg"> */}
      <BasicTable pool={pool} />
      {/* </Container> */}
    </Page>
  );
}

export default PoolDetails;

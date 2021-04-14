import Page from 'src/components/Page';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderDashboard } from 'src/layouts/Common';
import { getCards, getProfile, getAddressBook } from 'src/redux/slices/user';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Divider } from '@material-ui/core';
import IdoInformation from './IdoInformation';
import ProjectInformation from './ProjectInformation';
import { divide } from 'lodash-es';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  tabBar: {
    marginBottom: theme.spacing(5)
  }
}));

// ----------------------------------------------------------------------

function AccountView() {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('general');
  const dispatch = useDispatch();
  const { cards, myProfile } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getCards());
    dispatch(getAddressBook());
    dispatch(getProfile());
  }, [dispatch]);

  if (!myProfile) {
    return null;
  }

  if (!cards) {
    return null;
  }

  // const ACCOUNT_TABS = [
  //   {
  //     value: 'general',
  //     icon: <Icon icon={roundAccountBox} width={20} height={20} />,
  //     component: <General />
  //   }
  // ];

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Page title="TaalSwap | IDO" className={classes.root}>
      <Container>
        <HeaderDashboard
          heading="Create a new Application"
          links={[{ name: 'New Application' }]}
        />
        <Divider />
        <IdoInformation />
        <Divider />
        <ProjectInformation />
      </Container>
    </Page>
  );
}

export default AccountView;

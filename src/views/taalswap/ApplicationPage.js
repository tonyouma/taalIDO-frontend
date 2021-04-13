import General from './General';
import Page from 'src/components/Page';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderDashboard } from 'src/layouts/Common';
import { getCards, getProfile, getAddressBook } from 'src/redux/slices/user';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

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

        {/* 탭 삭제 */}
        {/* <Tabs
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
        </Tabs> */}

        <General />

        {/* {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })} */}
      </Container>
    </Page>
  );
}

export default AccountView;

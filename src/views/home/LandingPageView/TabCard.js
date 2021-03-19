import clsx from 'clsx';
import React, { useState } from 'react';
import PlanCard from './PlanCard';
import Page from 'src/components/Page';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { PATH_APP } from 'src/routes/paths';
import checkmarkFill from '@iconify-icons/eva/checkmark-fill';
import { Link as RouterLink } from 'react-router-dom';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { HeaderDashboard } from 'src/layouts/Common';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Card,
  Tab,
  Grid,
  Tabs,
  Typography,
  Container,
  CardContent,
  CardHeader
} from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { MLabel } from 'src/theme';

// ----------------------------------------------------------------------

const SIMPLE_TAB = [
  {
    value: '1',
    icon: <PhoneIcon />,
    label: 'Live&Upcoming Pools',
    disabled: false
  },
  {
    value: '2',
    icon: <FavoriteIcon />,
    label: 'Accomplished Pools',
    disabled: true
  }
];

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '90%',
    margin: 'auto',
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    flexDirection: 'column',
    padding: theme.spacing(3),
    [theme.breakpoints.up(414)]: {
      padding: theme.spacing(5)
    }
  }
}));

// ----------------------------------------------------------------------

const PLANS = [
  {
    icon: '/static/icons/ic_plan_free.svg',
    lists: [
      { text: 'Ratio', isAvailable: true },
      { text: 'MAX', isAvailable: true },
      { text: 'Access', isAvailable: true },
      { text: 'Max.Contribution', isAvailable: true },
      { text: 'Totlal Raise', isAvailable: true }
    ]
  },
  {
    icon: '/static/icons/ic_plan_starter.svg',
    lists: [
      { text: 'Ratio', isAvailable: true },
      { text: 'MAX', isAvailable: true },
      { text: 'Access', isAvailable: true },
      { text: 'Max.Contribution', isAvailable: true },
      { text: 'Totlal Raise', isAvailable: true }
    ]
  },
  {
    icon: '/static/icons/ic_plan_premium.svg',
    lists: [
      { text: 'Ratio', isAvailable: true },
      { text: 'MAX', isAvailable: true },
      { text: 'Access', isAvailable: true },
      { text: 'Max.Contribution', isAvailable: true },
      { text: 'Totlal Raise', isAvailable: true }
    ]
  }
];

// ----------------------------------------------------------------------

function TabsView() {
  const classes = useStyles();
  const [value, setValue] = useState('1');
  const [valueScrollable, setValueScrollable] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeScrollable = (event, newValue) => {
    setValueScrollable(newValue);
  };

  return (
    <Page
      title="Live&Upcoming Pools | Accomplished Pools"
      className={classes.root}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <CardContent>
              <TabContext value={value}>
                <TabList onChange={handleChange} centered>
                  {SIMPLE_TAB.map((tab) => (
                    <Tab key={tab.value} label={tab.label} value={tab.value} />
                  ))}
                </TabList>
              </TabContext>
            </CardContent>
          </Grid>
        </Grid>
      </Container>

      <Grid container spacing={3}>
        {PLANS.map((card, index) => (
          <Grid item xs={12} md={4} key={card.subscription}>
            <PlanCard card={card} index={index} />
          </Grid>
        ))}
      </Grid>
    </Page>
  );
}

export default TabsView;

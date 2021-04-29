import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import Page from 'src/components/Page';
import { HeaderDashboard } from 'src/layouts/Common';
import JoninthePool from './JoninthePool';
import useBreakpoints from 'src/hooks/useBreakpoints';
import PaymentInformation from './PaymentInformation';
import Participate from '../SwapView/Participate';
import AboutTheProject from '../SwapView/AboutTheProject';
import { useFormik, Form, FormikProvider } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Card,
  Container,
  Box,
  Tab,
  Tabs,
  Backdrop,
  CircularProgress,
  Typography
} from '@material-ui/core';
import TotalAllocatedTokens from './TotalAllocatedTokens';
import TotalPurchasers from './TotalPurchasers';
import CurrentProgress from './CurrentProgress';
import PoolButton from './PoolButton';
import { useLocation } from 'react-router-dom';
import PoolDetails from '../PoolDetails';
import { capitalCase } from 'change-case';
import { Icon } from '@iconify/react';
import roundAccountBox from '@iconify-icons/ic/round-account-box';
import { useTranslation } from 'react-i18next';
import buyIcon from '@iconify-icons/icons8/buy';
import bxDetail from '@iconify-icons/bx/bx-detail';
import peopleAudience24Regular from '@iconify-icons/fluent/people-audience-24-regular';
import locationCompany from '@iconify-icons/carbon/location-company';
import Countdown from './Countdown';
import { infuraChainId } from 'src/config';
import { useSelector } from 'react-redux';
import getEthPrice from 'src/utils/getEthPrice';

import './App.css';
// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: theme.spacing(5)
  },
  tabBar: {
    marginBottom: theme.spacing(5)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));

const TABS = [
  {
    value: 0,
    title: 'Join the Pool',
    icon: <Icon icon={buyIcon} width={20} height={20} />
    // component: <PaymentInformation />
  },
  {
    value: 1,
    title: 'Pool Detail',
    icon: <Icon icon={bxDetail} width={20} height={20} />
    // component: <JoninthePool />
  },
  {
    value: 2,
    title: 'Participants',
    icon: <Icon icon={peopleAudience24Regular} width={20} height={20} />
    // component: <Participate />
  },
  {
    value: 3,
    title: 'About The Porject',
    icon: <Icon icon={locationCompany} width={20} height={20} />
    // component: <AboutTheProject />
  }
];

// ----------------------------------------------------------------------
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
      {value === index && <>{children}</>}
    </div>
  );
}

function PaymentView({ className, ...other }) {
  const classes = useStyles();
  const location = useLocation();
  const upMd = useBreakpoints('up', 'md');
  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      address: ''
    }
  });
  const [value, setValue] = useState(0);
  const [pool, setPool] = useState(location.state.selectedPool);
  const [open, setOpen] = useState(false);
  const [ethPrice, setEthPrice] = useState(0);
  const { os, wallet, from } = useSelector((state) => state.talken);
  const { i18n, t } = useTranslation();
  const langStorage = localStorage.getItem('i18nextLng');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleBackdrop = (open) => {
    setOpen(open);
    if (!open) {
      setPool({ ...pool });
      console.log('---', pool);
    }
  };

  useEffect(async () => {
    setEthPrice(await getEthPrice(langStorage === 'kr' ? 'KRW' : 'USD'));
  }, [t]);

  return (
    <Page title="Swap | TaalSwap" className={classes.root}>
      <Container maxWidth="lg" className="projects_wrap">
        <Backdrop
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column'
          }}
          className={classes.backdrop}
          open={open}
        >
          <Box>
            <CircularProgress color="inherit" />
          </Box>
          <Box>
            <Typography>In progress… Please wait.</Typography>
          </Box>
        </Backdrop>
        <HeaderDashboard
          heading={pool.poolName}
          links={[{ name: pool.tokenContractAddr }]}
          subTitle={pool.tokenContractAddr}
          url={`https://${infuraChainId}.etherscan.io/address/${pool.tokenContractAddr}`}
          url={`https://rinkeby.etherscan.io/address/${pool.tokenContractAddr}`}
          className="projectstitle_box"
        />
        <img
          src="/static/icons/taalswap_coinsymbol.svg"
          className="symbol_icon"
        />
        <div className={classes.listIcon} id="icon_box">
          <a
            href={`https://twitter.com/${pool.twitterId}`}
            target="_blank"
            class={
              pool.twitterId && pool.twitterId !== ''
                ? 'icon_tweet'
                : 'icon_tweet_null'
            }
          ></a>
          <a
            href={`https://t.me/${pool.telegramHandle.replace('@', '')}`}
            target="_blank"
            class={
              pool.telegramHandle && pool.telegramHandle !== ''
                ? 'icon_page'
                : 'icon_page_null'
            }
          ></a>

          <a
            disabled="true"
            href={pool.mediumURL}
            target="_blank"
            class={
              pool.mediumURL && pool.mediumURL !== ''
                ? 'icon_message'
                : 'icon_message_null'
            }
          ></a>
        </div>
        <Tabs
          value={value}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={handleChange}
          className={classes.tabBar}
        >
          {TABS.map((tab) => {
            let tabTitle;
            switch (tab.value) {
              case 0:
                tabTitle = t('taalswap.JoinThePool');
                break;
              case 1:
                tabTitle = t('taalswap.PoolDetail');
                break;
              case 2:
                tabTitle = t('taalswap.Participants');
                break;
              case 3:
                tabTitle = t('taalswap.AboutTheProject');
                break;
            }
            return (
              <Tab
                disableRipple
                key={tab.value}
                label={tabTitle}
                icon={tab.icon}
                value={tab.value}
              />
            );
          })}
        </Tabs>
        <TabPanel value={value} index={0}>
          {/* <Container> */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <TotalAllocatedTokens pool={pool} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TotalPurchasers pool={pool} />
            </Grid>
            {/* <Grid item xs={12} sm={6} md={4}>
              <CurrentProgress pool={pool} />
            </Grid> */}
            <Grid item xs={12} sm={6} md={4}>
              <Countdown pool={pool} from={from} />
            </Grid>
          </Grid>
          <Box sx={{ my: 3 }}></Box>
          <Card>
            <Grid container spacing={upMd ? 5 : 2}>
              <Grid item xs={12} md={6}>
                <PaymentInformation
                  formik={formik}
                  pool={pool}
                  ethPrice={ethPrice}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <JoninthePool
                  formik={formik}
                  pool={pool}
                  onBackdrop={handleBackdrop}
                  ethPrice={ethPrice}
                />
              </Grid>
            </Grid>
          </Card>
          {/* </Container> */}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PoolDetails pool={pool} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Participate pool={pool} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <AboutTheProject pool={pool} />
        </TabPanel>

        {/* <div className={clsx(classes.root, className)} {...other}>
          <PoolButton />
        </div>
        <Card>
          <FormikProvider value={formik}>
            <Form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
              <Grid container spacing={upMd ? 5 : 2}>
                <Grid item xs={12} md={6}>
                  <PaymentInformation formik={formik} pool={pool} />
                </Grid>

                <Grid item xs={12} md={6}>
                  <JoninthePool formik={formik} pool={pool} />
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        </Card>
        <Card style={{ marginTop: '3rem' }}>
          <PoolDetails pool={pool} />
        </Card> */}
      </Container>
    </Page>
  );
}

export default PaymentView;

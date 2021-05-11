import React, { useEffect, useState, useRef } from 'react';
import Page from 'src/components/Page';
import { HeaderDashboard } from 'src/layouts/Common';
import JoninthePool from './JoninthePool';
import useBreakpoints from 'src/hooks/useBreakpoints';
import PaymentInformation from './PaymentInformation';
import Participate from '../SwapView/Participate';
import AboutTheProject from '../SwapView/AboutTheProject';
import { useFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, useParams } from 'react-router-dom';

import {
  AppBar,
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
import { useLocation, useHistory } from 'react-router-dom';
import PoolDetails from '../PoolDetails';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import buyIcon from '@iconify-icons/icons8/buy';
import bxDetail from '@iconify-icons/bx/bx-detail';
import peopleAudience24Regular from '@iconify-icons/fluent/people-audience-24-regular';
import locationCompany from '@iconify-icons/carbon/location-company';
import Countdown from './Countdown';
import { infuraChainId } from 'src/config';

import getEthPrice from 'src/utils/getEthPrice';
import { getPoolList } from '../../../redux/slices/pool';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';
// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: theme.spacing(5)
  },
  tabBar: {
    marginBottom: theme.spacing(5)

    // position: 'fixed'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },

  header: {
    backgroundColor: theme.palette.background.default,
    // backgroundColor: alpha(theme.palette.background.default, 0.72),
    marginTop: APPBAR_MOBILE,
    padding: theme.spacing(0, 5),

    minHeight: APPBAR_MOBILE,
    [theme.breakpoints.up('md')]: {
      marginTop: APPBAR_MOBILE,
      padding: theme.spacing(0, 5)
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: APPBAR_DESKTOP,
      minHeight: APPBAR_DESKTOP,
      paddingLeft: DRAWER_WIDTH + 20,
      // paddingTop: '1rem',
      padding: theme.spacing(0, 5)
    }
  },

  sticky: {
    position: 'fixed',
    zIndex: '1000',
    border: '1px solid blue'
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
      style={{ minHeight: '500px', border: '1px solid red' }}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

function PaymentView({ className, ...other }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const headerDiv = useRef([]);
  const joinThePool = useRef(null);
  const poolDetail = useRef(null);
  const participants = useRef(null);
  const aboutProject = useRef(null);

  const upSm = useBreakpoints('up', 'sm');
  const { id } = useParams();
  const { poolList } = useSelector((state) => state.pool);
  const upMd = useBreakpoints('up', 'md');
  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      address: ''
    }
  });
  const [value, setValue] = useState(0);
  const [pool, setPool] = useState(null);
  const [open, setOpen] = useState(false);
  const [ethPrice, setEthPrice] = useState(0);
  const { from } = useSelector((state) => state.talken);
  const { i18n, t } = useTranslation();
  const langStorage = localStorage.getItem('i18nextLng');
  const isDeskTop = upMd ? true : false;

  const scrollToRef = (value) => {
    try {
      const obj = {
        0: joinThePool,
        1: poolDetail,
        2: participants,
        3: aboutProject
      };

      if (obj[value] !== undefined && obj[value] !== null) {
        window.scrollTo({
          top: obj[value].current.offsetTop
        });
        let marginTop = headerDiv.current.clientHeight - APPBAR_DESKTOP + 30;

        if (value === 3) {
          if (!isDeskTop) {
            marginTop = marginTop + 30;
          } else {
            marginTop = marginTop - 150;
          }
        }

        window.scrollBy(0, -marginTop);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e, newValue) => {
    if (newValue !== null) {
      setValue(newValue);
    }
  };

  const handleBackdrop = (open) => {
    setOpen(open);
    if (!open) {
      setPool({ ...pool });
      console.log('---', pool);
    }
  };

  useEffect(async () => {
    if (poolList !== null && poolList.length !== 0) {
      let result = null;
      poolList.map((pool) => pool.id == id && (result = pool));
      if (result === null) {
        history.push('/app/taalswap/pools');
      } else {
        setPool(result);
      }
    } else {
      await dispatch(getPoolList());
    }

    setEthPrice(await getEthPrice(langStorage === 'kr' ? 'KRW' : 'USD'));
  }, [t, poolList, langStorage]);

  const scrollCallBack = () => {
    try {
      // console.log(joinThePool.current.clientHeight);
      // console.log(poolDetail.current.clientHeight);
      // console.log(participants.current.clientHeight);

      const joinThePoolHeight = joinThePool.current.clientHeight;
      const poolDetailHeight = poolDetail.current.clientHeight;
      const participantsHeight = participants.current.clientHeight;

      if (window.pageYOffset >= 0 && window.pageYOffset < joinThePoolHeight) {
        handleChange(null, 0);
      } else if (
        window.pageYOffset >= joinThePoolHeight &&
        window.pageYOffset < joinThePoolHeight + poolDetailHeight
      ) {
        handleChange(null, 1);
      } else if (
        window.pageYOffset >= joinThePoolHeight + poolDetailHeight &&
        window.pageYOffset <
          joinThePoolHeight + poolDetailHeight + participantsHeight
      ) {
        handleChange(null, 2);
      } else {
        handleChange(null, 3);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    try {
      // const scrollCallBack = window.addEventListener('scroll', () => {
      //   try {
      //     console.log(joinThePool.current.clientHeight);
      //     console.log(poolDetail.current.clientHeight);
      //     console.log(participants.current.clientHeight);

      //     const joinThePoolHeight = joinThePool.current.clientHeight;
      //     const poolDetailHeight = poolDetail.current.clientHeight;
      //     const participantsHeight = participants.current.clientHeight;

      //     if (
      //       // window.pageYOffset >= 0 &&
      //       // window.pageYOffset < joinThePool.current.clientHeight

      //       window.pageYOffset >= 0 &&
      //       window.pageYOffset < joinThePoolHeight
      //     ) {
      //       handleChange(null, 0);
      //     } else if (
      //       // window.pageYOffset >= joinThePool.current.clientHeight &&
      //       // window.pageYOffset <
      //       //   joinThePool.current.clientHeight + poolDetail.current.clientHeight

      //       window.pageYOffset >= joinThePoolHeight &&
      //       window.pageYOffset < joinThePoolHeight + poolDetailHeight
      //     ) {
      //       handleChange(null, 1);
      //     } else if (
      //       // window.pageYOffset >=
      //       //   joinThePool.current.clientHeight +
      //       //     poolDetail.current.clientHeight &&
      //       // window.pageYOffset <
      //       //   joinThePool.current.clientHeight +
      //       //     poolDetail.current.clientHeight +
      //       //     participants.current.clientHeight

      //       window.pageYOffset >= joinThePoolHeight + poolDetailHeight &&
      //       window.pageYOffset <
      //         joinThePoolHeight + poolDetailHeight + participantsHeight
      //     ) {
      //       handleChange(null, 2);
      //     } else {
      //       handleChange(null, 3);
      //     }
      //   } catch (error) {
      //     console.log(error);
      //   }
      // });

      window.addEventListener('scroll', scrollCallBack);
      return () => {
        window.removeEventListener('scroll', scrollCallBack);
      };
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <Page title="Swap | TaalSwap" className={classes.root}>
        {pool && (
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
            <AppBar
              elevation={0}
              color="default"
              id="myHeader"
              ref={headerDiv}
              className={classes.header}
            >
              <HeaderDashboard
                heading={pool.poolName}
                links={[{ name: pool.tokenContractAddr }]}
                subTitle={pool.tokenContractAddr}
                url={
                  infuraChainId === 'mainnet'
                    ? `https://etherscan.io/address/${pool.tokenContractAddr}`
                    : `https://${infuraChainId}.etherscan.io/address/${pool.tokenContractAddr}`
                }
                className="projectstitle_box"
              />
              <img
                src={
                  pool.iconUrl && pool.iconUrl !== ''
                    ? `${pool.iconUrl}`
                    : `/static/icons/json-logo.svg`
                }
                className="symbol_icon"
              />
              <div className={classes.listIcon} id="icon_box">
                <a
                  href={`https://twitter.com/${pool.twitterId}`}
                  target="_blank"
                  className={
                    pool.twitterId && pool.twitterId !== ''
                      ? 'icon_tweet'
                      : 'icon_tweet_null'
                  }
                ></a>
                <a
                  href={`https://t.me/${pool.telegramHandle.replace('@', '')}`}
                  target="_blank"
                  className={
                    pool.telegramHandle && pool.telegramHandle !== ''
                      ? 'icon_page'
                      : 'icon_page_null'
                  }
                ></a>

                <a
                  disabled={true}
                  href={pool.mediumURL}
                  target="_blank"
                  className={
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
                      onClick={() => scrollToRef(tab.value)}
                    />
                  );
                })}
              </Tabs>
            </AppBar>
            <div
              style={{
                marginTop: headerDiv.current.clientHeight
              }}
            >
              <div ref={joinThePool}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={4}>
                    <TotalAllocatedTokens pool={pool} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TotalPurchasers pool={pool} />
                  </Grid>
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
              </div>
              <div ref={poolDetail} style={{ marginTop: '3rem' }}>
                <PoolDetails pool={pool} />
              </div>
              <div ref={participants}>
                <Participate pool={pool} />
              </div>
              <div ref={aboutProject} style={{ marginTop: '3rem' }}>
                <AboutTheProject pool={pool} />
              </div>
            </div>
          </Container>
        )}
      </Page>
    </div>
  );
}

export default PaymentView;

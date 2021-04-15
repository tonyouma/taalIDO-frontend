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
    icon: <Icon icon={roundAccountBox} width={20} height={20} />
    // component: <PaymentInformation />
  },
  {
    value: 1,
    title: 'Pool Detail',
    icon: <Icon icon={roundAccountBox} width={20} height={20} />
    // component: <JoninthePool />
  },
  {
    value: 2,
    title: 'Participants',
    icon: <Icon icon={roundAccountBox} width={20} height={20} />
    // component: <Participate />
  },
  {
    value: 3,
    title: 'About The Porject',
    icon: <Icon icon={roundAccountBox} width={20} height={20} />
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
  const { i18n, t } = useTranslation();

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
    await axios
      .get('https://api.coinbase.com/v2/prices/ETH-USD/spot')
      .then((result) => {
        setEthPrice(result.data.data.amount);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Page title="Swap | TaalSwap" className={classes.root}>
      <Container maxWidth="lg">
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
          url={`https://rinkeby.etherscan.io/address/${pool.tokenContractAddr}`}
        />

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
              <TotalAllocatedTokens />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TotalPurchasers />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CurrentProgress />
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
        {/* <TabPanel value={value} index={3}>
          <AboutTheProject pool={pool} />
        </TabPanel> */}

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

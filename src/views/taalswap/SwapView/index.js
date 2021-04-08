import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
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
  Tab,
  Tabs,
  Backdrop,
  CircularProgress
} from '@material-ui/core';
import PoolButton from './PoolButton';
import { useLocation } from 'react-router-dom';
import PoolDetails from '../PoolDetails';
import { capitalCase } from 'change-case';
import { Icon } from '@iconify/react';
import roundAccountBox from '@iconify-icons/ic/round-account-box';

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

function PaymentView(className, ...other) {
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

  return (
    <Page title="Swap | TaalSwap" className={classes.root}>
      <Container maxWidth="lg">
        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
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
          {TABS.map((tab) => (
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
          <Card>
            <Grid container spacing={upMd ? 5 : 2}>
              <Grid item xs={12} md={6}>
                <PaymentInformation formik={formik} pool={pool} />
              </Grid>

              <Grid item xs={12} md={6}>
                <JoninthePool
                  formik={formik}
                  pool={pool}
                  onBackdrop={handleBackdrop}
                />
              </Grid>
            </Grid>
          </Card>
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

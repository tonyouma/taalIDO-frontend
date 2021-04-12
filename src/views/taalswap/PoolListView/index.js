import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { capitalCase } from 'change-case';
import { Icon } from '@iconify/react';
import roundAccountBox from '@iconify-icons/ic/round-account-box';
import { HeaderDashboard } from 'src/layouts/Common';
import Page from '../../../components/Page';
import {
  Tab,
  Tabs,
  Card,
  Container,
  Grid,
  Box,
  Typography,
  OutlinedInput,
  InputAdornment,
  Backdrop,
  CircularProgress
} from '@material-ui/core';
import BasicTable from './BasicTable';
import { useTranslation } from 'react-i18next';
import MyPools from './MyPools';
import { useWeb3React } from '@web3-react/core';
import { useDispatch, useSelector } from 'react-redux';
import { getSwapList, getPoolList } from '../../../redux/slices/pool';
import ToolbarTable from '../../user/UserListView/ToolbarTable';
import searchFill from '@iconify-icons/eva/search-fill';
import { useLocation } from 'react-router-dom';

// ----------------------------------------------------------------------

const POOLS_TABS = [
  {
    value: 0,
    title: 'All Projects',
    icon: <Icon icon={roundAccountBox} width={20} height={20} />,
    component: <BasicTable />
  },
  {
    value: 1,
    title: 'My Projects',
    icon: <Icon icon={roundAccountBox} width={20} height={20} />,
    component: <MyPools />
  }
];
const useStyles = makeStyles((theme) => ({
  root: {},
  tabBar: {
    marginBottom: theme.spacing(5)
  },
  tableTop: {
    display: 'flex',
    justifyContent: 'space-between',
    // alignItems: 'center',
    // height: '70px',
    [theme.breakpoints.down('sm')]: {
      // border: '1px solid red',
      flexDirection: 'column'
    }
  },
  tableTab: {
    width: '100%',
    // border: '1px solid blue',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '0px'
    }
  },
  tableSearch: {
    width: '400px',
    textAlign: 'right',
    // border: '1px solid black',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
      marginBottom: '1rem'
    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));

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
      {value === index && (
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Card>{children}</Card>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

function PoolListView() {
  const classes = useStyles();
  const context = useWeb3React();
  const dispatch = useDispatch();
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState('All Pools');
  const [value, setValue] = useState(0);
  const [filterName, setFilterName] = useState('');
  const [open, setOpen] = useState(false);
  const { library, account } = context;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };
  const { i18n, t } = useTranslation();

  const onFilterName = (e) => {
    setFilterName(e.target.value);
  };

  const handleBackdrop = (open) => {
    console.log(open);
    setOpen(open);
  };

  useEffect(async () => {
    await dispatch(getPoolList());
    await dispatch(getSwapList(account));
    if (location.state !== null) {
      setValue(location.state.tabValue);
    }
  }, [dispatch]);

  return (
    <Page title={t('taalswap.projects')} className={classes.root}>
      {/* <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop> */}
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
      <Container maxWidth="lg">
        {/* <HeaderDashboard
          heading={t('taalswap.projects')}
          links={[{ name: 'Swap' }]}
        /> */}
        <HeaderDashboard
          heading={t('taalswap.projects')}
          links={[{ name: 'textejfiej' }]}
        />
        <Box className={classes.tableTop}>
          <Box className={classes.tableTab}>
            <Tabs
              value={value}
              scrollButtons="auto"
              variant="scrollable"
              allowScrollButtonsMobile
              onChange={handleChange}
              className={classes.tabBar}
            >
              {POOLS_TABS.map((tab) => (
                <Tab
                  disableRipple
                  key={tab.value}
                  label={capitalCase(tab.title)}
                  icon={tab.icon}
                  value={tab.value}
                />
              ))}
            </Tabs>
          </Box>
          <Box className={classes.tableSearch}>
            <OutlinedInput
              value={filterName}
              onChange={onFilterName}
              placeholder="Search by Project Name..."
              size="small"
              startAdornment={
                <InputAdornment position="start">
                  <Box
                    component={Icon}
                    icon={searchFill}
                    sx={{ color: 'text.disabled' }}
                  />
                </InputAdornment>
              }
              className={classes.search}
            />
          </Box>
        </Box>
        <TabPanel value={value} index={0}>
          <BasicTable filterName={filterName} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MyPools filterName={filterName} onBackdrop={handleBackdrop} />
        </TabPanel>
      </Container>
    </Page>
  );
}

export default PoolListView;

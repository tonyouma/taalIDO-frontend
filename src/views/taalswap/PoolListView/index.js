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
  CircularProgress,
  Tooltip,
  TextField,
  Select
} from '@material-ui/core';
import BasicTable from './BasicTable';
import { useTranslation } from 'react-i18next';
import MyPools from './MyPools';
import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux';
import { getSwapList, getPoolList } from '../../../redux/slices/pool';
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

const CATEGORIES = [
  { value: 'All', label: 'All' },
  { value: 'DeFi', label: 'DeFi' },
  { value: 'NFT', label: 'NFT' },
  { value: 'Others', label: 'Others' }
];

const useStyles = makeStyles((theme) => ({
  root: {},
  tabBar: {
    marginBottom: theme.spacing(5)
  },
  tableTop: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  tableTab: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '0px'
    }
  },
  tableSearch: {
    width: '400px',
    padding: '10px',
    textAlign: 'right',
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
  const [category, setCategory] = useState('All');
  const [open, setOpen] = useState(false);
  const { library, account } = context;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const handleChangeTab = (event, newValue) => {
  //   setCurrentTab(newValue);
  // };

  const { i18n, t } = useTranslation();

  const onFilterName = (e) => {
    setFilterName(e.target.value);
  };

  const handleBackdrop = (open) => {
    console.log(open);
    setOpen(open);
  };

  const handleSelectCategory = (e) => {
    setCategory(e.target.value);
  };

  useEffect(async () => {
    await dispatch(getPoolList());
    await dispatch(getSwapList(account));
    if (location.state !== null && location.state !== undefined) {
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
        {/* <Tooltip title="Simple Info. Text Display">
          <Box
            component="img"
            src={`/static/icons/ic_write_25.png`}
            sx={{
              top: 140,
              position: 'absolute',
              width: 25,
              height: 25,
              ml: 15
            }}
          />
        </Tooltip> */}
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
            <TextField
              select
              size="small"
              label="Category"
              onChange={handleSelectCategory}
              SelectProps={{ native: true }}
            >
              {CATEGORIES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
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
          <BasicTable filterName={filterName} category={category} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MyPools
            filterName={filterName}
            category={category}
            onBackdrop={handleBackdrop}
          />
        </TabPanel>
      </Container>
    </Page>
  );
}

export default PoolListView;

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PlanCard from './PlanCard';
import Page from 'src/components/Page';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Grid,
  Container,
  CircularProgress,
  Typography
} from '@material-ui/core';
import { PATH_APP } from 'src/routes/paths';
import { useWeb3React } from '@web3-react/core';
import { getPoolStatus } from '../../../utils/getPoolStatus';
import Taalswap from 'src/utils/taalswap';
import { PoolStatus } from 'src/utils/poolStatus';
import './APP.css';
import { useTranslation } from 'react-i18next';
import getEthPrice from 'src/utils/getEthPrice';
// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100%',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(10)
  },
  header: {
    top: 0,
    left: 0,
    lineHeight: 0,
    width: '100%',
    position: 'absolute',
    padding: theme.spacing(3, 3, 0),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5, 5, 0)
    }
  },

  label: {
    fontSize: 28
  }
}));

const POOLS_TABS = [
  {
    value: 0,
    title: 'Live & Upcoming'
  },
  {
    value: 1,
    title: 'Accomplished'
  }
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const { i18n, t } = useTranslation();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}
// ----------------------------------------------------------------------
function Tabcard() {
  const classes = useStyles();
  const context = useWeb3React();
  const [value, setValue] = useState(0);
  const { poolList } = useSelector((state) => state.pool);
  const [ethPrice, setEthPrice] = useState(0);
  // const [pools, setPools] = useState([]);
  // const [accomplishedPools, setAccomplishedPools] = useState([]);

  const [upcomingLivePools, setUpcomingLivePools] = useState([]);
  const [finishedPools, setFinishedPools] = useState([]);
  const [etcPools, setEtcPools] = useState([]);

  const [loadingFlag, setLoadingFlag] = useState(false);

  const { library, account } = context;
  const { i18n, t } = useTranslation();

  useEffect(async () => {
    try {
      // let tempPools = [];
      // let tempAccomplishedPools = [];

      let tempUpcomingLivePools = [];
      let tempFinishedPools = [];
      let tempEtcPools = [];

      const langStorage = localStorage.getItem('i18nextLng');

      await poolList
        .filter((pool) => !!pool.contractAddress && pool.contractAddress !== '')
        .map(async (pool) => {
          let taalswap = null;
          if (!!library) {
            taalswap = new Taalswap({
              application: pool,
              account,
              library
            });
          } else {
            taalswap = new Taalswap({
              application: pool,
              notConnected: true
            });
          }

          await getPoolStatus(taalswap, pool.status, pool.minFundRaise).then(
            (result) => {
              if (
                result === PoolStatus.FILLED.SUCCESS.ACCOMPLISHED ||
                result === PoolStatus.FILLED.SUCCESS.CLOSED ||
                result === PoolStatus.FILLED.FAILED
              ) {
                tempFinishedPools = tempFinishedPools.concat({
                  ...pool,
                  poolStatus: result
                });
                setFinishedPools(tempFinishedPools);
              } else if (
                result === PoolStatus.UPCOMING ||
                result === PoolStatus.LIVE ||
                result === PoolStatus.PAUSED
              ) {
                tempUpcomingLivePools = tempUpcomingLivePools.concat({
                  ...pool,
                  poolStatus: result
                });
                setUpcomingLivePools(tempUpcomingLivePools);
              } else {
                tempEtcPools = tempEtcPools.concat({
                  ...pool,
                  poolStatus: result
                });
                setEtcPools(tempEtcPools);
              }
            }
          );
        });

      setEthPrice(await getEthPrice(langStorage === 'kr' ? 'KRW' : 'USD'));

      return;
    } catch (error) {
      console.log(error);

      return;
    }
  }, [poolList, library, t]);

  useEffect(() => {
    try {
      if (
        poolList.filter(
          (pool) => !!pool.contractAddress && pool.contractAddress !== ''
        ).length ===
        finishedPools.length + upcomingLivePools.length + etcPools.length
      ) {
        setLoadingFlag(false);
      } else {
        setLoadingFlag(true);
      }
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  }, [poolList, finishedPools, upcomingLivePools, etcPools]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Page title="TaalSwap Finance" className={classes.root} id="tabcard_wrap">
      <Container maxWidth="lg">
        <Box sx={{ width: '100%' }}>
          <Tabs value={value} onChange={handleChange} centered>
            {POOLS_TABS.map((tab) => {
              let labelStr;
              switch (tab.value) {
                case 0:
                  labelStr = t('taalswap.LiveUpcoming');
                  break;
                case 1:
                  labelStr = t('taalswap.Finished');
                  break;
              }
              return (
                <Tab
                  disableRipple
                  key={tab.value}
                  label={labelStr}
                  value={tab.value}
                  className={classes.label}
                />
              );
            })}
          </Tabs>
          <TabPanel value={value} index={0}>
            <Box sx={{ my: 5 }} className="tabcard_loading">
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {loadingFlag && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column'
                    }}
                  >
                    <CircularProgress />
                    <Typography color="primary">loading..</Typography>
                  </Box>
                )}
              </Box>
            </Box>
            <Grid container spacing={3}>
              {/* {pools.map((pool, index) => ( */}
              {upcomingLivePools.map((pool, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <PlanCard pool={pool} ethPrice={ethPrice} index={index} />
                </Grid>
              ))}
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box sx={{ my: 5 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end'
                }}
              ></Box>
            </Box>
            <Grid container spacing={3}>
              {/* {accomplishedPools.map((pool, index) => ( */}
              {finishedPools.map((pool, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <PlanCard pool={pool} ethPrice={ethPrice} index={index} />
                </Grid>
              ))}
            </Grid>
          </TabPanel>
        </Box>
      </Container>
      <Container maxWidth="lg">
        <Box sx={{ my: 7 }} className="view_btnwrap">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Button
              to={PATH_APP.taalswap.pools}
              fullWidth
              size="large"
              variant="outlined"
              component={RouterLink}
            >
              {t('taalswap.ViewAll')}
            </Button>
          </Box>
        </Box>
      </Container>
    </Page>
  );
}

export default Tabcard;

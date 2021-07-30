import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
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
  const [pools, setPools] = useState([]);
  const [accomplishedPools, setAccomplishedPools] = useState([]);
  const [loadingFlag, setLoadingFlag] = useState(false);

  const { library, account } = context;

  useEffect(async () => {
    try {
      let tempPools = [];
      let tempAccomplishedPools = [];

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
              if (result !== PoolStatus.FILLED.SUCCESS.ACCOMPLISHED) {
                tempPools = tempPools.concat({ ...pool, poolStatus: result });
                setPools(tempPools);
              } else {
                tempAccomplishedPools = tempAccomplishedPools.concat({
                  ...pool,
                  poolStatus: result
                });
                setAccomplishedPools(tempAccomplishedPools);
              }
            }
          );
        });

      await axios
        .get('https://api.coinbase.com/v2/prices/ETH-USD/spot')
        .then((result) => {
          setEthPrice(result.data.data.amount);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  }, [poolList, library]);

  useEffect(() => {
    try {
      if (
        poolList.filter(
          (pool) => !!pool.contractAddress && pool.contractAddress !== ''
        ).length ===
        pools.length + accomplishedPools.length
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
  }, [poolList, pools, accomplishedPools]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Page title="TaalSwap Finance" className={classes.root} id="tabcard_wrap">
      <Container maxWidth="lg">
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <div className="tit_line">
            <Typography variant="h3" align="left" gutterBottom>
              Live & Upcoming
            </Typography>
          </div>
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
            {pools.map((pool, index) => (
              <Grid item xs={12} md={4} key={index}>
                <PlanCard pool={pool} ethPrice={ethPrice} index={index} />
              </Grid>
            ))}
          </Grid>
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
              View All
            </Button>
          </Box>
        </Box>
      </Container>
    </Page>
  );
}

export default Tabcard;

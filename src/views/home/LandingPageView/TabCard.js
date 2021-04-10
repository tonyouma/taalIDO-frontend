import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PlanCard from './PlanCard';
import Page from 'src/components/Page';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Grid, Container } from '@material-ui/core';
import { PATH_APP } from 'src/routes/paths';

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
  // page 2-1 글자 스타일
  label: {
    fontSize: 20
  }
}));

// ----------------------------------------------------------------------

function Tabcard() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { poolList } = useSelector((state) => state.pool);

  const [pools, setPools] = useState([]);

  useEffect(() => {
    setPools(
      poolList.filter(
        (pool) => !!pool.contractAddress && pool.contractAddress !== ''
      )
    );
  }, [poolList]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Page title="TaalSwap Finance" className={classes.root}>
      <Container maxWidth="lg">
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Live & Upcoming" className={classes.label} />
            <Tab label="Accomplished" className={classes.label} />
          </Tabs>
        </Box>

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
          {pools.map((pool, index) => (
            <Grid item xs={12} md={4} key={index}>
              <PlanCard pool={pool} index={index} />
            </Grid>
          ))}
        </Grid>

        {/* <Grid container spacing={3} sx={{ my: 5 }}>
          {pools.map((card, index) => (
            <Grid item xs={12} md={4} key={card.subscription}>
              <PlanCard pool={card} index={index} />
            </Grid>
          ))}
        </Grid> */}
      </Container>
      <Container maxWidth="lg">
        <Box sx={{ my: 7 }}>
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

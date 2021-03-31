import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CandidateCard from './CandidateCard';
import Page from 'src/components/Page';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Grid, Container, Typography } from '@material-ui/core';
import { PATH_APP } from 'src/routes/paths';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100%',
    paddingTop: theme.spacing(0),
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
  }
}));

// ----------------------------------------------------------------------

function CandidatePool() {
  const classes = useStyles();
  const { poolList } = useSelector((state) => state.pool);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    // dispatch(getPoolList());
    setCandidates(poolList.filter((pool) => pool.contractAddress === ''));
    console.log(candidates);
  }, [poolList]);

  return (
    <Page title="TaalSwap Finace" className={classes.root}>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" gutterBottom>
          Candidate Pools
        </Typography>

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
          {candidates.map((candidate, index) => (
            <Grid item xs={12} md={4} key={index}>
              <CandidateCard key={index} pool={candidate} index={index} />
            </Grid>
          ))}
        </Grid>
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

export default CandidatePool;

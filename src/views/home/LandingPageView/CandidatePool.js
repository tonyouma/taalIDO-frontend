import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CandidateCard from './CandidateCard';
import Page from 'src/components/Page';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Grid, Container, Typography } from '@material-ui/core';
import { PATH_APP } from 'src/routes/paths';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  useEffect(() => {
    // dispatch(getPoolList());
    setCandidates(poolList.filter((pool) => pool.contractAddress === ''));
  }, [poolList]);

  return (
    <Page title="TaalSwap Finance" className={classes.root} id="candidate_wrap">
      <Container maxWidth="lg">
        <div className="tit_line">
          <Typography fontSize="16px" align="left" gutterBottom>
            {t('taalswap.CandidateProjects')}
          </Typography>
        </div>

        <Box sx={{ my: 5 }} className="pooltitle_wrap">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}
          ></Box>
        </Box>

        <Grid container spacing={2}>
          {candidates.map((candidate, index) => (
            <Grid item xs={12} md={3} key={index}>
              <CandidateCard key={index} pool={candidate} index={index} />
            </Grid>
          ))}
        </Grid>
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
              {t('taalswap.ViewAllProjects')}
            </Button>
          </Box>
        </Box>
      </Container>
    </Page>
  );
}

export default CandidatePool;

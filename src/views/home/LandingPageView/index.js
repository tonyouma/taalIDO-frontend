import React, { useEffect } from 'react';
import Hero from './Hero';
import Footer from './Footer';
import DarkMode from './DarkMode';
import Page from 'src/components/Page';
import Advertisement from './Advertisement';
import CleanInterfaces from './CleanInterfaces';
//import HugePackElements from './HugePackElements';
import TabCard from './TabCard';
import Finished from './Finished';
import { makeStyles } from '@material-ui/core/styles';
import CandidatePool from './CandidatePool';
import { useDispatch, useSelector } from 'react-redux';
import { getPoolList } from '../../../redux/slices/pool';
import './APP.css';
// ------------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  content: {
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: theme.palette.background.default
  }
}));

function LandingPageView() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPoolList());
  }, [dispatch]);
  return (
    <Page
      title="Fire up your project with TaalSwap"
      id="move_top"
      className={classes.root}
    >
      <Hero />
      <div className={classes.content}>
        <TabCard />
        <Finished />
        <CandidatePool />
        <Advertisement />
        <CleanInterfaces />
        <Footer />
      </div>
    </Page>
  );
}

export default LandingPageView;

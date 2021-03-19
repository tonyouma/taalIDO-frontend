import React from 'react';
import Hero from './Hero';
import Footer from './Footer';
import DarkMode from './DarkMode';
import Page from 'src/components/Page';
import Advertisement from './Advertisement';
import CleanInterfaces from './CleanInterfaces';
//import HugePackElements from './HugePackElements';
import TabCard from './TabCard';
import { makeStyles } from '@material-ui/core/styles';
import CandidatePool from './CandidatePool';

// ----------------------------------------------------------------------

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

  return (
    <Page
      title="Fire up your project with TaalSwap"
      id="move_top"
      className={classes.root}
    >
      <Hero />
      <div className={classes.content}>
        <TabCard />
        <CandidatePool />
        <Advertisement />
        <CleanInterfaces />
        <DarkMode />
      </div>
    </Page>
  );
}

export default LandingPageView;

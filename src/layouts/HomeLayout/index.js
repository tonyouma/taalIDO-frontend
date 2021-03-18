import React from 'react';
import TopBar from './TopBar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: { height: '100%' },
  content: { height: '100%' }
}));

// ----------------------------------------------------------------------

HomeLayout.propTypes = {
  children: PropTypes.node
};

function HomeLayout({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TopBar />
      <div className={classes.content}>{children}</div>
    </div>
  );
}

export default HomeLayout;

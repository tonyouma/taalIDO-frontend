import NavBar from './NavBar';
import TopBar from './TopBar';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden'
  }
}));

// ----------------------------------------------------------------------

DocsLayout.propTypes = {
  children: PropTypes.node
};

function DocsLayout({ children }) {
  const classes = useStyles();
  const [openNav, setOpenNav] = useState(false);

  return (
    <div className={classes.root}>
      <TopBar onOpenNav={() => setOpenNav(true)} />
      <NavBar onCloseNav={() => setOpenNav(false)} isOpenNav={openNav} />

      <Container
        maxWidth="md"
        sx={{
          my: 15,
          flexGrow: 1,
          overflow: 'auto',
          minHeight: '100%'
        }}
      >
        {children}
      </Container>
    </div>
  );
}

export default DocsLayout;

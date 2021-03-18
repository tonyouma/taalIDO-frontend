import React from 'react';
import Logo from 'src/components/Logo';
import Page from 'src/components/Page';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import {
  MotionContainer,
  varBounce,
  varBounceIn
} from 'src/components/Animate';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Typography, Container } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100%',
    alignItems: 'center',
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
  }
}));

// ----------------------------------------------------------------------

function Page404View() {
  const classes = useStyles();

  return (
    <Page title="404 Page Not Found | Minimal-UI" className={classes.root}>
      <header className={classes.header}>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
      </header>

      <Container>
        <MotionContainer initial="initial" open>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <motion.div variants={varBounce}>
              <Typography variant="h3" gutterBottom>
                Sorry, page not found!
              </Typography>
            </motion.div>
            <Typography sx={{ color: 'text.secondary' }}>
              Sorry, we couldn’t find the page you’re looking for. Perhaps
              you’ve mistyped the URL? Be sure to check your spelling.
            </Typography>

            <Box
              component={motion.img}
              variants={varBounceIn}
              alt="404"
              src="/static/illustrations/illustration_404.svg"
              sx={{ width: '100%', maxHeight: 240, my: { xs: 5, sm: 10 } }}
            />

            <Button
              to="/"
              size="large"
              variant="contained"
              component={RouterLink}
            >
              Go to Home
            </Button>
          </Box>
        </MotionContainer>
      </Container>
    </Page>
  );
}

export default Page404View;

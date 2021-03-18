import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Box, Card, CardContent } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
    textAlign: 'center',
    backgroundColor: theme.palette.primary.lighter,
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      textAlign: 'left',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    [theme.breakpoints.up('xl')]: {
      height: 320
    }
  }
}));

// ----------------------------------------------------------------------

Welcome.propTypes = {
  displayName: PropTypes.string,
  className: PropTypes.string
};

function Welcome({ displayName, className, ...other }) {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <CardContent
        sx={{
          p: { md: 0 },
          pl: { md: 5 }
        }}
      >
        <Typography gutterBottom variant="h4" sx={{ color: 'grey.800' }}>
          Welcome back,
          <br /> {!displayName ? '...' : displayName}!
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: 'grey.800',
            pb: { xs: 3, xl: 5 }
          }}
        >
          {
            "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything"
          }
        </Typography>

        <Button variant="contained" to="#" component={RouterLink}>
          Go Now
        </Button>
      </CardContent>

      <Box
        component="img"
        alt="welcome"
        src="/static/illustrations/illustration_seo.svg"
        sx={{
          p: 2,
          height: 280,
          margin: { xs: 'auto', md: 'inherit' }
        }}
      />
    </Card>
  );
}

export default Welcome;

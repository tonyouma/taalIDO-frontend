import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import useAuth from 'src/hooks/useAuth';
import googleFill from '@iconify-icons/eva/google-fill';
import twitterFill from '@iconify-icons/eva/twitter-fill';
import facebookFill from '@iconify-icons/eva/facebook-fill';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Divider, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

SocialLogin.propTypes = {
  className: PropTypes.string
};

function SocialLogin({ className }) {
  const classes = useStyles();
  const { loginWithGoogle, loginWithFaceBook, loginWithTwitter } = useAuth();

  const handleLoginGoogle = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginFaceBook = async () => {
    try {
      await loginWithFaceBook();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginTwitter = async () => {
    try {
      await loginWithTwitter();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={clsx(classes.root, className)}>
      <Grid container spacing={2}>
        <Grid item xs>
          <Button
            fullWidth
            size="large"
            color="inherit"
            variant="outlined"
            onClick={handleLoginGoogle}
          >
            <Icon icon={googleFill} color="#DF3E30" height={24} />
          </Button>
        </Grid>
        <Grid item xs>
          <Button
            fullWidth
            size="large"
            color="inherit"
            variant="outlined"
            onClick={handleLoginFaceBook}
          >
            <Icon icon={facebookFill} color="#1877F2" height={24} />
          </Button>
        </Grid>
        <Grid item xs>
          <Button
            fullWidth
            size="large"
            color="inherit"
            variant="outlined"
            onClick={handleLoginTwitter}
          >
            <Icon icon={twitterFill} color="#1C9CEA" height={24} />
          </Button>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>
    </div>
  );
}

export default SocialLogin;

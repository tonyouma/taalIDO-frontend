import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import LazySize from 'src/components/LazySize';
import MyAvatar from 'src/components/MyAvatar';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    '&:before': {
      top: 0,
      zIndex: 9,
      width: '100%',
      content: "''",
      height: '100%',
      position: 'absolute',
      backdropFilter: 'blur(3px)',
      backgroundColor: alpha(theme.palette.primary.darker, 0.72)
    }
  },
  userInfo: {
    left: 0,
    right: 0,
    zIndex: 99,
    position: 'absolute',
    marginTop: theme.spacing(5),
    [theme.breakpoints.up('md')]: {
      right: 'auto',
      display: 'flex',
      alignItems: 'center',
      left: theme.spacing(3),
      bottom: theme.spacing(3)
    }
  }
}));

// ----------------------------------------------------------------------

ProfileCover.propTypes = {
  myProfile: PropTypes.object,
  authUser: PropTypes.object,
  className: PropTypes.string
};

function ProfileCover({ myProfile, authUser, className }) {
  const classes = useStyles();
  const { position, cover } = myProfile;
  const { displayName } = authUser;

  return (
    <div className={clsx(classes.root, className)}>
      <div className={classes.userInfo}>
        <MyAvatar
          sx={{
            mx: 'auto',
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'common.white',
            width: { xs: 80, md: 128 },
            height: { xs: 80, md: 128 }
          }}
        />
        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 1, md: 0 },
            color: 'common.white',
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          <Typography variant="h4">{displayName}</Typography>
          <Typography sx={{ opacity: 0.72 }}>{position}</Typography>
        </Box>
      </div>
      <LazySize
        alt="profile cover"
        src={cover.small}
        size={`${cover.small} 600w, ${cover.medium} 960w`}
        sx={{ zIndex: 8, height: '100%', position: 'absolute' }}
      />
    </div>
  );
}

export default ProfileCover;

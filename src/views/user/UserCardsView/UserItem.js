import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import LazySize from 'src/components/LazySize';
import { fShortenNumber } from 'src/utils/formatNumber';
import twitterFill from '@iconify-icons/eva/twitter-fill';
import linkedinFill from '@iconify-icons/eva/linkedin-fill';
import facebookFill from '@iconify-icons/eva/facebook-fill';
import instagramFilled from '@iconify-icons/ant-design/instagram-filled';
import { alpha, makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Grid,
  Avatar,
  Tooltip,
  Divider,
  Typography,
  IconButton
} from '@material-ui/core';
import { MIcon } from 'src/theme';

// ----------------------------------------------------------------------

const SOCIALS = [
  {
    name: 'Facebook',
    icon: <Icon icon={facebookFill} width={20} height={20} color="#1877F2" />
  },
  {
    name: 'Instagram',
    icon: <Icon icon={instagramFilled} width={20} height={20} color="#D7336D" />
  },
  {
    name: 'Linkedin',
    icon: <Icon icon={linkedinFill} width={20} height={20} color="#006097" />
  },
  {
    name: 'Twitter',
    icon: <Icon icon={twitterFill} width={20} height={20} color="#1C9CEA" />
  }
];

const useStyles = makeStyles((theme) => ({
  root: {},
  cardMediaWrap: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    paddingTop: 'calc(100% * 9 / 16)',
    '&:before': {
      top: 0,
      zIndex: 9,
      content: "''",
      width: '100%',
      height: '100%',
      position: 'absolute',
      backdropFilter: 'blur(3px)',
      borderTopLeftRadius: theme.shape.borderRadiusMd,
      borderTopRightRadius: theme.shape.borderRadiusMd,
      backgroundColor: alpha(theme.palette.primary.darker, 0.72)
    }
  },
  avatarShape: {
    zIndex: 10,
    bottom: -26,
    position: 'absolute'
  }
}));

// ----------------------------------------------------------------------

function InfoItem(number) {
  return (
    <Grid item xs={4} sx={{ textAlign: 'center' }}>
      <Typography
        variant="caption"
        sx={{ mb: 0.5, color: 'text.secondary', display: 'block' }}
      >
        Follower
      </Typography>
      <Typography variant="subtitle1">{fShortenNumber(number)}</Typography>
    </Grid>
  );
}

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
  className: PropTypes.string
};

function UserItem({ user, className }) {
  const classes = useStyles();
  const {
    name,
    cover,
    position,
    follower,
    totalPost,
    avatarUrl,
    following
  } = user;

  return (
    <Card className={clsx(classes.root, className)}>
      <div className={classes.cardMediaWrap}>
        <MIcon
          size={144}
          color="paper"
          src="/static/icons/shape-avatar.svg"
          className={classes.avatarShape}
        />
        <Avatar
          alt={name}
          src={avatarUrl}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            position: 'absolute',
            transform: 'translateY(-50%)'
          }}
        />
        <LazySize
          alt="cover"
          src={cover.small}
          size={`${cover.small} 600w, ${cover.medium} 960w`}
          sx={{
            top: 0,
            zIndex: 8,
            width: '100%',
            height: '100%',
            position: 'absolute'
          }}
        />
      </div>

      <Typography variant="subtitle1" align="center" sx={{ mt: 6 }}>
        {name}
      </Typography>
      <Typography
        variant="body2"
        align="center"
        sx={{ color: 'text.secondary' }}
      >
        {position}
      </Typography>

      <Box sx={{ textAlign: 'center', mt: 2, mb: 2.5 }}>
        {SOCIALS.map((social) => (
          <Tooltip key={social.name} title={social.name}>
            <IconButton>{social.icon}</IconButton>
          </Tooltip>
        ))}
      </Box>

      <Divider />

      <Grid container sx={{ py: 3 }}>
        {InfoItem(follower)}
        {InfoItem(following)}
        {InfoItem(totalPost)}
      </Grid>
    </Card>
  );
}

export default UserItem;

import clsx from 'clsx';
import React from 'react';
import { filter } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import searchFill from '@iconify-icons/eva/search-fill';
import twitterFill from '@iconify-icons/eva/twitter-fill';
import SearchNotFound from 'src/components/SearchNotFound';
import linkedinFill from '@iconify-icons/eva/linkedin-fill';
import facebookFill from '@iconify-icons/eva/facebook-fill';
import moreVerticalFill from '@iconify-icons/eva/more-vertical-fill';
import instagramFilled from '@iconify-icons/ant-design/instagram-filled';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Card,
  Link,
  Avatar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment
} from '@material-ui/core';

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
  root: {
    marginTop: theme.spacing(5)
  },
  card: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    flexDirection: 'column',
    padding: theme.spacing(5, 0)
  },
  search: {
    width: 240,
    marginBottom: theme.spacing(5),
    transition: theme.transitions.create(['box-shadow', 'width'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter
    }),
    '&.Mui-focused': {
      width: 320,
      boxShadow: theme.shadows[25].z8
    },
    '& fieldset': {
      borderWidth: `1px !important`,
      borderColor: `${theme.palette.grey[500_32]} !important`
    }
  }
}));

// ----------------------------------------------------------------------

function applyFilter(array, query) {
  if (query) {
    array = filter(array, (_friend) => {
      return _friend.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
  }
  return array;
}

FriendCards.propTypes = {
  follower: PropTypes.object
};

function FriendCard({ follower }) {
  const classes = useStyles();
  const { name, role, avatarUrl } = follower;

  return (
    <Card className={clsx(classes.card)}>
      <Avatar
        alt={name}
        src={avatarUrl}
        sx={{ width: 64, height: 64, mb: 3 }}
      />
      <Link
        to="#"
        variant="subtitle1"
        color="text.primary"
        component={RouterLink}
      >
        {name}
      </Link>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {role}
      </Typography>
      <Box sx={{ display: 'flex', mt: 1 }}>
        {SOCIALS.map((social) => (
          <Tooltip key={social.name} title={social.name}>
            <IconButton>{social.icon}</IconButton>
          </Tooltip>
        ))}
      </Box>
      <IconButton
        sx={{
          top: 8,
          right: 8,
          position: 'absolute'
        }}
      >
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>
    </Card>
  );
}

FriendCards.propTypes = {
  friends: PropTypes.array,
  findFriends: PropTypes.string,
  onFindFriends: PropTypes.func,
  className: PropTypes.string
};

function FriendCards({ friends, findFriends, onFindFriends, className }) {
  const classes = useStyles();
  const friendFiltered = applyFilter(friends, findFriends);
  const isNotFound = friendFiltered.length === 0;

  return (
    <div className={clsx(classes.root, className)}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Friends
      </Typography>

      <OutlinedInput
        value={findFriends}
        onChange={onFindFriends}
        placeholder="Find friends..."
        startAdornment={
          <InputAdornment position="start">
            <Box
              component={Icon}
              icon={searchFill}
              sx={{ color: 'text.disabled' }}
            />
          </InputAdornment>
        }
        className={classes.search}
      />

      <Grid container spacing={3}>
        {friendFiltered.map((follower) => (
          <Grid key={follower.id} item xs={12} md={4}>
            <FriendCard follower={follower} />
          </Grid>
        ))}
      </Grid>

      {isNotFound && (
        <Box sx={{ mt: 5 }}>
          <SearchNotFound searchQuery={findFriends} />
        </Box>
      )}
    </div>
  );
}

export default FriendCards;

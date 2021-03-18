import React from 'react';
import PropTypes from 'prop-types';
import useAuth from 'src/hooks/useAuth';
import { MAvatar } from 'src/theme';
import createAvatar from 'src/utils/createAvatar';

// ----------------------------------------------------------------------

MyAvatar.propTypes = {
  className: PropTypes.string
};

function MyAvatar({ className, ...other }) {
  const { user } = useAuth();

  return (
    <MAvatar
      src={user.photoURL}
      alt={user.displayName}
      color={user.photoURL ? 'default' : createAvatar(user.displayName).color}
      className={className}
      {...other}
    >
      {createAvatar(user.displayName).name}
    </MAvatar>
  );
}

export default MyAvatar;

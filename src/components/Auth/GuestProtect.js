import React from 'react';
import PropTypes from 'prop-types';
import useAuth from 'src/hooks/useAuth';
import { PATH_APP } from 'src/routes/paths';
import { Redirect } from 'react-router-dom';
import LoadingScreen from 'src/components/LoadingScreen';

// ----------------------------------------------------------------------

GuestProtect.propTypes = {
  children: PropTypes.node
};

function GuestProtect({ children }) {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    return <Redirect to={PATH_APP.root} />;
  }

  return <>{children}</>;
}

export default GuestProtect;

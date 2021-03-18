import React from 'react';
import PropTypes from 'prop-types';
import useAuth from 'src/hooks/useAuth';
import { Redirect } from 'react-router-dom';
import { PATH_PAGE } from 'src/routes/paths';
import LoadingScreen from 'src/components/LoadingScreen';

// ----------------------------------------------------------------------

AuthProtect.propTypes = {
  children: PropTypes.node
};

function AuthProtect({ children }) {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Redirect to={PATH_PAGE.auth.login} />;
  }

  return <>{children}</>;
}

export default AuthProtect;

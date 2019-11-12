import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withAuth } from '@okta/okta-react';

import { setAuth } from './auth';
import { updateUsers } from './users';

const AuthHandler = ({
  auth,
  location,
  token,
  authUser,
  setAuth,
  updateUsers,
}) => {
  React.useEffect(() => {
    auth.getIdToken().then((nextToken = null) => {
      if (nextToken !== token) {
        setAuth({ token: nextToken });
      }
    });
  });

  React.useEffect(() => {
    if (location.pathname === '/login') auth.login('/');
    if (location.pathname === '/logout') auth.logout('/');
  }, [auth, location.pathname]);

  React.useEffect(() => {
    updateUsers(authUser);
  }, [authUser, updateUsers]);

  return null;
};

const mapStateToProps = state => ({
  token: state.auth.token,
  authUser: state.auth.user,
});

const mapDispatchToProps = { setAuth, updateUsers };

export default compose(
  withAuth,
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(AuthHandler);
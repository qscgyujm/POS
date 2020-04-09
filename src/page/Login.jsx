import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { action as authAction } from '../redux/auth';

import LoginComponent from '../components/Login';

function Login(props) {
  return (
    <LoginComponent
      {...props}
    />
  );
}

const mapStateToProps = (state) => state.auth;

const mapDispatchToProps = (dispatch) => {
  const {
    fetchAuth,
    loginAuth,
  } = authAction;

  return {
    ...bindActionCreators({
      fetchAuth,
      loginAuth,
    }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

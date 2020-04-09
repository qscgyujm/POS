import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { action as authAction } from '../redux/auth';

import Register from '../components/RegisterProfile';

const index = (props) => (
  <Register
    {...props}
  />
);

const mapStateToProps = (state) => state.auth;

const mapDispatchToProps = (dispatch) => {
  const {
    sendCode,
    checkCode,
  } = authAction;

  return {
    ...bindActionCreators({
      sendCode,
      checkCode,
    }, dispatch),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(index);

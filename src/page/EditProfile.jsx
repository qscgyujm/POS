import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { action as profileAction } from '../redux/profile';

import EditProfile from '../components/EditProfile';

const index = (props) => (
  <EditProfile
    {...props}
  />
);

const mapStateToProps = (state) => state.profile;

const mapDispatchToProps = (dispatch) => {
  const {
    fetchProfile,
    updateProfile,
    updatePassword,
  } = profileAction;

  return {
    ...bindActionCreators({
      fetchProfile,
      updateProfile,
      updatePassword,
    }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);

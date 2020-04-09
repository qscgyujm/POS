import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { action as adminAction } from '../redux/admin';
import { action as fileAction } from '../redux/file';

import SettingProduct from '../components/SettingProduct';


const index = (props) => (
  <SettingProduct
    {...props}
  />
);

const mapStateToProps = (state) => {
  const { isAdmin } = state.auth;
  return {
    ...state.admin,
    isAdmin,
  };
};

const mapDispatchToProps = (dispatch) => {
  const {
    fetchProduct,
    createProduct,
    updateProduct,
    deleteProduct,
  } = adminAction;

  const {
    uploadImg,
  } = fileAction;

  return {
    ...bindActionCreators({
      fetchProduct,
      createProduct,
      updateProduct,
      deleteProduct,
      uploadImg,
    }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);

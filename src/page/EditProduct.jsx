import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { action as productAction } from '../redux/product';
import { action as fileAction } from '../redux/file';

import EditProductComponent from '../components/EditProduct';

const EditProduct = (props) => (
  <EditProductComponent
    {...props}
  />
);

const mapStateToProps = (state) => state.product;

const mapDispatchToProps = (dispatch) => {
  const {
    fetchProduct,
    createAddProduct,
    deleteProduct,
  } = productAction;

  const {
    uploadImg,
  } = fileAction;

  return {
    ...bindActionCreators({
      fetchProduct,
      createAddProduct,
      deleteProduct,
      uploadImg,
    }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);

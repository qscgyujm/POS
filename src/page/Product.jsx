import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { action as productAction } from '../redux/product';
import { action as orderAction } from '../redux/order';

import ProductComponent from '../components/Product';

function Product(props) {
  return (
    <ProductComponent
      {...props}
    />
  );
}

const mapStateToProps = (state) => state.product;

const mapDispatchToProps = (dispatch) => {
  const {
    fetchProduct,
  } = productAction;
  const {
    createOrder,
  } = orderAction;

  return {
    ...bindActionCreators({
      fetchProduct,
      createOrder,
    }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { action as productAction } from '../redux/product';

import compose from '../helper/compose';

import ProductComponent from '../components/Product';

const Product = (props) => {
  console.log(props);
  return (
    <div>
      <ProductComponent
        {...props}
      />
    </div>
  );
};

const mapStateToProps = (state) => state.product;

const mapDispatchToProps = (dispatch) => {
  const {
    fetchProduct,
  } = productAction;

  return {
    ...bindActionCreators({
      fetchProduct,
    }, dispatch),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  (BaseComponent) => (props) => {
    const { fetchProduct } = props;

    React.useEffect(
      () => {
        fetchProduct();
      },
      [],
    );


    return (
      <BaseComponent
        {...props}
      />
    );
  },
)(Product);

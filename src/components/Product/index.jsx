import React from 'react';
import styled from 'styled-components';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { action as productAction } from '../../redux/product';
// import { action as orderAction } from '../../redux/order';

// import withWrapper from '../../hoc/withWrapper';

import compose from '../../helper/compose';

// import { LoginContainer } from '../../styles/layout';

// import Loading from '../Loading';
import SellProductItem from './view/ProductItem';
// import CheckoutProduct from './view/CheckoutProduct';

const ProductWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Product = (props) => {
  const {
    productList,
    // createOrder,
  } = props;

  const [localOrder, setLocalOrder] = React.useState([]);

  return (
    <>
      {/* <CheckoutProduct
        localOrder={localOrder}
        setLocalOrder={setLocalOrder}
        productList={productList}
        createOrder={null}
      /> */}
      <ProductWrapper>
        {
          productList.map((product, i) => (
            <SellProductItem
              key={i.toString()}
              {...props}
              product={product}
              localOrder={localOrder}
              setLocalOrder={setLocalOrder}
            />
          ))
        }
      </ProductWrapper>
    </>
  );
};

const mapStateToProps = (state) => state.product;

const mapDispatchToProps = (dispatch) => {
  const {
    fetchProduct,
  } = productAction;
  // const {
  //   createOrder,
  // } = orderAction;

  return {
    ...bindActionCreators({
      fetchProduct,
      // createOrder,
    }, dispatch),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  // withWrapper(LoginContainer),
  (BaseComponent) => (props) => {
    const {
      // isFetch,
      // productList,
      fetchProduct,
    } = props;

    React.useEffect(
      () => {
        fetchProduct();
      },
      [],
    );

    // if (isFetch) {
    //   return (
    //     <Loading
    //       isLoading
    //     />
    //   );
    // }

    // if (isEmpty(productList)) {
    //   return (
    //     <Loading />
    //   );
    // }

    return (
      <BaseComponent
        {...props}
      />
    );
  },
)(Product);

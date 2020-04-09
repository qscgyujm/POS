import React from 'react';
import styled from 'styled-components';
import compose from 'helper/compose';
import { isEmpty } from 'lodash';

import withWrapper from '../../hoc/withWrapper';

import { LoginContainer } from '../../styles/layout';

import Loading from '../Loading';
import SellProductItem from './view/SellProductItem';
import CheckoutProduct from './view/CheckoutProduct';

const ProductWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SellProductTable = (props) => {
  const { productList, createOrder } = props;

  const [localOrder, setLocalOrder] = React.useState([]);

  return (
    <>
      <CheckoutProduct
        localOrder={localOrder}
        setLocalOrder={setLocalOrder}
        productList={productList}
        createOrder={createOrder}
      />
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

export default compose(
  withWrapper(LoginContainer),
  (BaseComponent) => (props) => {
    const { isFetch, productList, fetchProduct } = props;

    React.useEffect(
      () => {
        fetchProduct();
      },
      [],
    );

    if (isFetch) {
      return (
        <Loading
          isLoading
        />
      );
    }

    if (isEmpty(productList)) {
      return (
        <Loading />
      );
    }

    return (
      <BaseComponent
        {...props}
      />
    );
  },
)(SellProductTable);

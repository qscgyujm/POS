import React from 'react';
import styled from 'styled-components';
import compose from 'helper/compose';
import { isEmpty } from 'lodash';

import withWrapper from '../../hoc/withWrapper';
import { media } from '../../helper/media';

import { LoginContainer } from '../../styles/layout';

import Loading from '../Loading';
import SellProductItem from './view/SellProductItem';
import Checkout from '../Checkout';

const CheckoutContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;

const ProductWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 2;

  ${media.laptop`
    overflow-y: auto;
    max-height: calc(100vh - 50px);
  `}
`;

const CheckoutWrapper = styled.div`
  flex: 1;
`;

const SellProductTable = (props) => {
  const { productList, createOrder } = props;

  const [localOrder, setLocalOrder] = React.useState([]);

  return (
    <CheckoutContainer>
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
      <CheckoutWrapper>
        <Checkout
          localOrder={localOrder}
          setLocalOrder={setLocalOrder}
          productList={productList}
          createOrder={createOrder}
        />
      </CheckoutWrapper>
    </CheckoutContainer>
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

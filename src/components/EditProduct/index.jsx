import React from 'react';
import styled from 'styled-components';

import compose from 'helper/compose';

import withWrapper from '../../hoc/withWrapper';

import { LoginContainer } from '../../styles/layout';

import Loading from '../Loading';
import SettingProductItem from './view/ProductItem';
import AddProduct from './view/AddProduct';

const ProductWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SettingProduct = (props) => {
  const { productList } = props;

  return (
    <>
      {
        productList.map((product, i) => (
          <SettingProductItem
            key={i.toString()}
            {...props}
            product={product}
            inEdit
          />
        ))
      }
      <AddProduct
        {...props}
      />
    </>
  );
};

export default compose(
  withWrapper(LoginContainer),
  withWrapper(ProductWrapper),
  (BaseComponent) => (props) => {
    const { isFetching, fetchProduct } = props;

    React.useEffect(
      () => {
        fetchProduct();
      },
      [],
    );

    if (isFetching) {
      return (
        <Loading
          isLoading
        />
      );
    }

    return (
      <BaseComponent
        {...props}
      />
    );
  },
)(SettingProduct);

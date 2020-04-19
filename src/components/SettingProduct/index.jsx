import React from 'react';
import styled from 'styled-components';
import { isEmpty } from 'lodash';
import { useHistory } from 'react-router-dom';

import compose from 'helper/compose';

import withWrapper from '../../hoc/withWrapper';

import ProductItem from '../EditProduct/view/ProductItem';
import CreateProduct from './view/CreateProduct';
import Loading from '../Loading';
import { LoginContainer } from '../../styles/layout';

const EnhanceLoginContainer = styled(LoginContainer)`
  background-color: #4cd6a5;
`;

const ProductWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const index = (props) => {
  console.log('Setting Product', props);
  const { productList } = props;

  return (
    <>
      {
        productList.map((product, i) => (
          <ProductItem
            key={i.toString()}
            {...props}
            product={product}
          />
        ))
      }
      <CreateProduct
        {...props}
      />
    </>
  );
};

export default compose(
  withWrapper(EnhanceLoginContainer),
  withWrapper(ProductWrapper),
  (BaseComponent) => (props) => {
    const {
      isFetching, isAdmin, productList, fetchProduct,
    } = props;

    const history = useHistory();

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

    if (isEmpty(productList)) {
      return (
        <Loading />
      );
    }

    if (!isAdmin) {
      history.push('/product');
    }

    return (
      <BaseComponent
        {...props}
      />
    );
  },
)(index);

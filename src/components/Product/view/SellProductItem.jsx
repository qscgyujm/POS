/* eslint camelcase: "off" */

import React from 'react';
import styled from 'styled-components';
import compose from 'helper/compose';
import { isEmpty } from 'lodash';

import withWrapper from '../../../hoc/withWrapper';

import { media } from '../../../helper/media';

import ProductImage from './ProductImg';
import ControlPanel from './ControlPanel';

const ProductContainer = styled.div`
  width: 25%;
  padding: 10px;
  box-sizing: border-box;

  ${media.laptop`
    width: 50%;
  `}
`;

const ProductWrapper = styled.div`
  background-color: #8a8a8a;
  border: solid 1px #8a8a8a;
  border-radius: 5px;
`;

const ProductName = styled.p`
  font-size: 24px;
  text-align: center;
  padding: 10px 0;
  font-weight: 700;
  background-color: #f9f9f9;
`;

const SellProduct = (props) => {
  const {
    product,
    localOrder,
    clickAddButtonHandler,
    clickMinusButtonHandler,
  } = props;

  const { p_id } = product;

  const orderCount = React.useMemo(() => {
    if (isEmpty(localOrder)) {
      return 0;
    }

    const order = localOrder.find((o) => o.p_id === p_id);
    if (order) {
      return order.count;
    }
    return 0;
  }, [localOrder, p_id]);

  return (
    <>
      <ProductImage
        imageUrl={product.imageUrl}
      />
      <ProductName>
        {
          product.name
        }
        {' '}
        (
        {
          product.price
        }
        )
      </ProductName>
      <ControlPanel
        {...props}
        orderCount={orderCount}
        clickAddButtonHandler={clickAddButtonHandler}
        clickMinusButtonHandler={clickMinusButtonHandler}
      />
    </>
  );
};

export default compose(
  withWrapper(ProductContainer),
  withWrapper(ProductWrapper),
  (BaseComponent) => (props) => {
    // console.log('product', props);

    const { product, localOrder, setLocalOrder } = props;
    const { p_id } = product;

    const clickAddButtonHandler = () => {
      const index = localOrder.findIndex((order) => order.p_id === p_id);

      if (isEmpty(localOrder)) {
        setLocalOrder([{
          ...product,
          count: 1,
        }]);
        return;
      }

      if (index < 0) {
        setLocalOrder(localOrder.concat({
          ...product,
          count: 1,
        }));
        return;
      }

      const newOrder = [...localOrder];
      newOrder[index] = {
        ...localOrder[index],
        count: localOrder[index].count + 1,
      };

      setLocalOrder(newOrder);
    };

    const clickMinusButtonHandler = () => {
      const index = localOrder.findIndex((order) => order.p_id === p_id);

      if (index < 0) {
        return;
      }

      if (localOrder[index].count === 1) {
        const newOrder = [...localOrder];
        newOrder.splice(index, 1);

        setLocalOrder(newOrder);
        return;
      }

      const newOrder = [...localOrder];
      newOrder[index] = {
        ...localOrder[index],
        count: localOrder[index].count - 1,
      };

      setLocalOrder(newOrder);
    };


    return (
      <BaseComponent
        {...props}
        clickAddButtonHandler={clickAddButtonHandler}
        clickMinusButtonHandler={clickMinusButtonHandler}
      />
    );
  },
)(SellProduct);

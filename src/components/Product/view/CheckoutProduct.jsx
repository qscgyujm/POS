import React from 'react';
import styled from 'styled-components';
import { compose } from 'recompose';
import { useHistory } from 'react-router-dom';

import { media } from '../../../helper/media';

import { Button } from '../../../styles/unit';

const CheckoutContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;

  ${media.tablet`
    display: block;
  `}
`;

const ButtonWrapper = styled.div`
`;

const CheckoutWrapper = styled.div`
  display: flex;

  ${media.tablet`
    display: block;
  `}
`;

const PriceWrapper = styled.div`
  margin-right: 30px;

  ${media.tablet`
    margin: 0;
    text-align: center;
  `}
`;

const PriceTag = styled.span`
  font-size: 30px;
  color: #e1334d;
  font-weight: 700px;

  ${media.tablet`
    font-size: 36px;
  `}
`;

const OrderButtonWrapper = styled.div`
  ${media.tablet`
    display: flex;
    justify-content: space-around;
  `}
`;

const OrderButton = styled(Button)`
`;

const ConfirmButton = styled(Button)`
  :not(:last-of-type) {
    margin-right: 15px;
  }
`;

const CheckoutPanel = (props) => {
  const {
    localOrder,
    productList,
    clickSubmitOrderHandler,
    clickCancelOrderHandler,
    clickOrderButtonHandler,
  } = props;

  const totalPrice = React.useMemo(() => localOrder.reduce((acc, order) => {
    const { price } = productList.find((product) => product.p_id === order.id);
    return acc + price * order.count;
  }, 0), [localOrder, productList]);

  return (
    <CheckoutContainer>
      <ButtonWrapper>
        <OrderButton
          onClick={clickOrderButtonHandler}
        >
          To Order
        </OrderButton>
      </ButtonWrapper>
      <CheckoutWrapper>
        <PriceWrapper>
          <PriceTag>
            {totalPrice}
          </PriceTag>
        </PriceWrapper>
        <OrderButtonWrapper>
          <ConfirmButton
            disabled={totalPrice === 0}
            onClick={clickSubmitOrderHandler}
          >
            送出
          </ConfirmButton>
          <ConfirmButton
            onClick={clickCancelOrderHandler}
          >
            取消
          </ConfirmButton>
        </OrderButtonWrapper>
      </CheckoutWrapper>
    </CheckoutContainer>
  );
};

export default compose(
  (BaseComponent) => (props) => {
    const { localOrder, setLocalOrder, createOrder } = props;
    const history = useHistory();

    const clickSubmitOrderHandler = () => {
      const resolve = () => {
        setLocalOrder([]);
      };

      createOrder(localOrder, resolve);
    };

    const clickCancelOrderHandler = () => {
      setLocalOrder([]);
    };

    const clickOrderButtonHandler = () => {
      history.push('/order');
    };

    return (
      <BaseComponent
        {...props}
        clickSubmitOrderHandler={clickSubmitOrderHandler}
        clickCancelOrderHandler={clickCancelOrderHandler}
        clickOrderButtonHandler={clickOrderButtonHandler}
      />
    );
  },
)(CheckoutPanel);

import React from 'react';
import styled from 'styled-components';
import compose from 'helper/compose';
import { useHistory } from 'react-router-dom';

import withModal from '../../hoc/withModal';

import { media } from '../../helper/media';

import { Button } from './style/unit';
import CheckoutItem from './view/CheckoutItem';
import ModalContent from './view/ModalContent';


const CheckoutContainer = styled.div`
`;

const CheckoutWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;

  ${media.tablet`
    display: block;
  `}
`;

const ButtonWrapper = styled.div`
`;

const CheckoutContentWrapper = styled.div`
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

const OrderWrapper = styled.div`
  padding: 10px;
`;

const ConfirmButton = styled(Button)`
  :not(:last-of-type) {
    margin-right: 15px;
  }
`;

const CheckoutPanel = (props) => {
  const {
    localOrder,
    setLocalOrder,
    totalPrice,
    clickCancelOrderHandler,
    clickOrderButtonHandler,
    toggleModal,

  } = props;

  const clickModal = () => {
    toggleModal(true);
  };

  return (
    <CheckoutContainer>
      <CheckoutWrapper>

        <ButtonWrapper>
          <OrderButton
            onClick={clickOrderButtonHandler}
          >
            To Order
          </OrderButton>
        </ButtonWrapper>
        <CheckoutContentWrapper>
          <PriceWrapper>
            <PriceTag>
              {totalPrice === 0 ? totalPrice : totalPrice.toFixed(2)}
            </PriceTag>
          </PriceWrapper>
          <OrderButtonWrapper>
            <ConfirmButton
              disabled={totalPrice === 0}
              onClick={clickModal}
            >
              送出
            </ConfirmButton>
            <ConfirmButton
              onClick={clickCancelOrderHandler}
            >
              取消
            </ConfirmButton>
          </OrderButtonWrapper>
        </CheckoutContentWrapper>
      </CheckoutWrapper>
      <OrderWrapper>
        {
          localOrder
          && localOrder.map((order, i) => (
            <CheckoutItem
              key={i.toString()}
              idx={i}
              order={order}
              localOrder={localOrder}
              setLocalOrder={setLocalOrder}
            />
          ))
        }
      </OrderWrapper>
    </CheckoutContainer>
  );
};

export default compose(
  (BaseComponent) => (props) => {
    console.log('check out', props);

    const {
      localOrder,
      setLocalOrder,
    } = props;

    const totalPrice = React.useMemo(
      () => localOrder.reduce(
        (acc, order) => acc + order.price * order.count,
        0,
      ),
      [localOrder],
    );

    const history = useHistory();

    const clickCancelOrderHandler = () => {
      setLocalOrder([]);
    };

    const clickOrderButtonHandler = () => {
      history.push('/order');
    };

    return (
      <BaseComponent
        {...props}
        totalPrice={totalPrice}
        clickCancelOrderHandler={clickCancelOrderHandler}
        clickOrderButtonHandler={clickOrderButtonHandler}
      />
    );
  },
  withModal(ModalContent),
)(CheckoutPanel);

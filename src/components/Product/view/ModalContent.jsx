import React from 'react';
import styled, { keyframes } from 'styled-components';
import { cloneDeep } from 'lodash';

import compose from '../../../helper/compose';
import { media } from '../../../helper/media';

import { Button } from '../style/unit';

const ModalNormalSlide = keyframes`
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ModalWrapper = styled.section`
  animation: ${ModalNormalSlide} 0.3s ease 0s both;
  border-radius: 5px;
  margin: auto;
  max-width: ${(props) => `${props.maxWidth}px`};
  width: 100%;
  line-height: 1.5;
`;

const ModalContentWrapper = styled.section`
  background: #FFF;
  border-radius: 5px;
  padding: 35px;

  ${media.tablet`
    padding: 20px;
  `}
`;

const ProductWrapper = styled.div`
`;

const ProductItemWrapper = styled.div`
  border: solid 1px #d8d8d8;
  border-radius: 5px;
  padding: 3px 5px;

  :not(:last-of-type) {
    margin-bottom: 5px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Content = styled.div`
`;

const ControlWrapper = styled.div`
  display: flex;

  *:not(:last-child){
    margin-right: 15px;
  }
`;

const PriceWrapper = styled.div`
  margin: 5px 10px;
  text-align: right;
  color: #e1334d;
  font-weight: 700;
`;

const ButtonWrapper = styled.div`
  margin-top:  10px;
  display: flex;
  justify-content: space-around;
`;

const ModalButton = styled(Button)`
`;

const ModalContent = (props) => {
  console.log('ModalContent', props);

  const {
    productList,
    localOrder,
    totalPrice,
    clickModalCancelHandler,
    clickSubmitOrderHandler,
    clickAddHandler,
    clickMinusHandler,
  } = props;

  const orderProducts = React.useMemo(
    () => localOrder
      .map((order) => {
        const productItem = productList.find((p) => order.id === p.p_id);
        return ({
          ...order,
          ...productItem,
        });
      }),
    [productList, localOrder],
  );

  console.log('orderProducts', orderProducts);

  return (
    <ModalWrapper
      maxWidth={550}
    >
      <ModalContentWrapper>
        <ProductWrapper>
          {
            orderProducts
            && orderProducts.map((p, id) => (
              <ProductItemWrapper
                key={id.toString()}
              >
                <ContentWrapper>
                  <Content>
                    {p.name}
                  </Content>
                  <ControlWrapper>
                    <Button
                      onClick={() => clickAddHandler(p.id, id)}
                    >
                      +
                    </Button>
                    <Content>
                      數量:
                      {' '}
                      {p.count}
                    </Content>
                    <Button
                      onClick={() => clickMinusHandler(p.id, id)}
                    >
                      -
                    </Button>
                  </ControlWrapper>
                </ContentWrapper>
              </ProductItemWrapper>
            ))
          }
        </ProductWrapper>
        <PriceWrapper>
          {totalPrice.toFixed(2)}
        </PriceWrapper>
        <ButtonWrapper>
          <ModalButton
            type="button"
            onClick={clickSubmitOrderHandler}
          >
            送出
          </ModalButton>
          <ModalButton
            type="button"
            onClick={clickModalCancelHandler}
          >
            Cancel
          </ModalButton>
        </ButtonWrapper>
      </ModalContentWrapper>
    </ModalWrapper>
  );
};

export default compose(
  (BaseComponent) => (props) => {
    const {
      localOrder,
      setLocalOrder,
      createOrder,
      toggleModal,
    } = props;

    const clickSubmitOrderHandler = () => {
      const resolve = () => {
        setLocalOrder([]);
        toggleModal(false);
      };

      createOrder(localOrder, resolve);
    };

    const clickModalCancelHandler = () => {
      toggleModal(false);
    };

    const clickAddHandler = (pId, idx) => {
      const newOrder = cloneDeep(localOrder);

      newOrder[idx] = {
        ...localOrder[idx],
        count: localOrder[idx].count + 1,
      };

      setLocalOrder(newOrder);
    };

    const clickMinusHandler = (pId, idx) => {
      if (localOrder[idx].count === 1) {
        const newOrder = localOrder.splice(idx, 1);

        setLocalOrder(newOrder);
        return;
      }

      const newOrder = cloneDeep(localOrder);
      newOrder[idx] = {
        ...localOrder[idx],
        count: localOrder[idx].count - 1,
      };

      setLocalOrder(newOrder);
    };

    return (
      <BaseComponent
        {...props}
        clickModalCancelHandler={clickModalCancelHandler}
        clickSubmitOrderHandler={clickSubmitOrderHandler}
        clickAddHandler={clickAddHandler}
        clickMinusHandler={clickMinusHandler}
      />
    );
  },
)(ModalContent);

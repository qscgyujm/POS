import React from 'react';
import styled from 'styled-components';

import compose from '../../../helper/compose';

import { ModalWrapper, ModalContentWrapper } from '../style/modal';
import { Button } from '../style/unit';


const ContentContainer = styled.div`
  text-align: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ContentButton = styled.div`
  padding: 50px;
  font-size: 36px;
  font-weight: 700;
  border-radius: 5px;
  border: 1px solid #777777;
  background-color: ${(props) => props.color};
  color: #FFF;
  
  flex: 1;

  :not(:last-of-type) {
    margin-right: 10px;
  }
`;


const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const CancelButton = styled(Button)`
`;

const ModalContent = (props) => {
  const {
    order,
    clickDealHandler,
    clickDeleteHandle,
    clickCancelHandler,
  } = props;
  const { order_id } = order;

  return (
    <ModalWrapper
      maxWidth={550}
    >
      <ModalContentWrapper>
        <ContentContainer>
          <ContentWrapper>
            <ContentButton
              color="#316497"
              onClick={() => clickDealHandler(order_id)}
            >
              Deal
            </ContentButton>
            <ContentButton
              color="#ff9745"
              onClick={() => clickDeleteHandle(order_id)}
            >
              Delete
            </ContentButton>
          </ContentWrapper>
          <ButtonWrapper>
            <CancelButton
              onClick={clickCancelHandler}
            >
              Cancel
            </CancelButton>
          </ButtonWrapper>
        </ContentContainer>
      </ModalContentWrapper>
    </ModalWrapper>
  );
};

export default compose(
  (BaseComponent) => (props) => {
    const { toggleModal } = props;

    const clickCancelHandler = () => {
      toggleModal(false);
    };

    const clickDealHandler = (id) => {
      const { updateDealOrder } = props;

      updateDealOrder(id);
    };

    const clickDeleteHandle = (id) => {
      const { deleteOrder } = props;

      deleteOrder(id);
    };

    return (
      <BaseComponent
        {...props}
        clickCancelHandler={clickCancelHandler}
        clickDealHandler={clickDealHandler}
        clickDeleteHandle={clickDeleteHandle}
      />
    );
  },
)(ModalContent);

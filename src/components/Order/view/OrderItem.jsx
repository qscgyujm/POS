/* eslint camelcase: "off" */

import React from 'react';
import styled, { css } from 'styled-components';
import { format } from 'date-fns';

import compose from 'helper/compose';
import withModal from '../../../hoc/withModal';

import { Button } from '../style/unit';
import ModalContent from './ModalContent';
import DetailItem from './DetailItem';

const ItemContainer = styled.div`
  margin-bottom: 5px;

  ${(props) => props.isDisplay && css`
    background-color: #FFF;
    border-radius: 5px;
  `}
`;

const ItemWrapper = styled.div`
  border: 1px solid #e9e9e9;
  border-radius: 5px;
  background-color: #e9e9e9;
  
  padding: 5px;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const InfoContentWrapper = styled.div`
  display: flex;
`;

const InfoWrapper = styled.div`
  :not(:last-of-type) {
    margin-right: 30px;
  }
`;

const ButtonWrapper = styled.div`
`;

const OrderButton = styled(Button)`
  :not(:last-of-type) {
    margin-right: 30px;
  }
`;

const DetailWrapper = styled.div`
  display: ${(props) => (props.isDisplay ? 'block' : 'none')};
  padding: 10px 20px;
`;

const convertDateTime = (time) => format(new Date(time), 'yy/MM/dd HH:mm:ss');

const OrderItem = (props) => {
  const {
    order,
    isDetail,
    clickModal,
    clickDisplayHandler,
  } = props;
  const {
    order_id,
    totalPrice,
    createdAt,
  } = order;

  return (
    <ItemContainer
      isDisplay={isDetail}
    >
      <ItemWrapper>
        <ContentWrapper>
          <InfoContentWrapper>
            <InfoWrapper>
              Order Number:
              {' '}
              {order_id}
            </InfoWrapper>
            <InfoWrapper>
              總價格:
              {' '}
              {totalPrice}
            </InfoWrapper>
          </InfoContentWrapper>
          <ButtonWrapper>
            <OrderButton
              onClick={clickDisplayHandler}
            >
              Detail
            </OrderButton>
            <OrderButton
              onClick={clickModal}
            >
              Checkout
            </OrderButton>
            {/* createdAt:
            {convertDateTime(createdAt)} */}
          </ButtonWrapper>
        </ContentWrapper>
      </ItemWrapper>
      {
        isDetail
        && (
        <DetailWrapper
          isDisplay={isDetail}
        >
          <DetailItem
            detailList={order.list}
          />
        </DetailWrapper>
        )
      }
    </ItemContainer>
  );
};

export default compose(
  withModal(ModalContent),
  (BaseComponent) => (props) => {
    const { toggleModal } = props;

    const [isDetail, setIsDetail] = React.useState(false);

    const clickDisplayHandler = () => {
      setIsDetail(!isDetail);
    };

    const clickModal = () => {
      toggleModal(true);
    };

    return (
      <BaseComponent
        {...props}
        isDetail={isDetail}
        clickModal={clickModal}
        clickDisplayHandler={clickDisplayHandler}
      />
    );
  },
)(OrderItem);

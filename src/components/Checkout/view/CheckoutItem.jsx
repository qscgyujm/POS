import React from 'react';
import styled from 'styled-components';

import compose from 'helper/compose';

const ItemWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #e9e9e9;
  border: 1px solid #e9e9e9;
  padding: 5px 15px ;
  position: relative;
`;

const ContentWrapper = styled.div`
  flex: 1;
  font-size: 20px;
  font-weight: 700;
`;

const DeleteIconWrapper = styled.div`
  position: absolute;
  right: 15px;
  color: #e1334d;
  font-weight: 700;

  cursor: pointer;
`;


const Symbol = styled.div`
  margin-right: 15px;
`;

const CheckoutItem = (props) => {
  const { order, clickDeleteHandler } = props;

  const purchasePrice = React.useMemo(
    () => order.price * order.count,
    [order],
  );

  return (
    <ItemWrapper>
      <ContentWrapper>
        {order.name}
      </ContentWrapper>
      <Symbol>
        *
      </Symbol>
      <ContentWrapper>
        {order.count}
      </ContentWrapper>
      <Symbol>
        =
      </Symbol>
      <ContentWrapper>
        {(purchasePrice).toFixed(2)}
      </ContentWrapper>
      <DeleteIconWrapper
        onClick={clickDeleteHandler}
      >
        X
      </DeleteIconWrapper>
    </ItemWrapper>
  );
};

export default compose(
  (BaseComponent) => (props) => {
    const { idx, localOrder, setLocalOrder } = props;

    const clickDeleteHandler = () => {
      const newOrder = [...localOrder];
      newOrder.splice(idx, 1);

      setLocalOrder(newOrder);
    };

    return (
      <BaseComponent
        {...props}
        clickDeleteHandler={clickDeleteHandler}
      />
    );
  },
)(CheckoutItem);

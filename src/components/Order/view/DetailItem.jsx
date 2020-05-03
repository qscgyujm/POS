import React from 'react';
import styled from 'styled-components';

import compose from '../../../helper/compose';

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #ffc55f;
  border: 1px solid #ffc55f;
  padding: 5px 15px ;
`;

const ContentWrapper = styled.div`
  flex: 1;
  font-size: 20px;
  font-weight: 700;
`;

const Symbol = styled.div`
  margin-right: 15px;
`;

const DetailItem = (props) => {
  console.log('detail', props);

  const { detailList } = props;

  return (
    <>
      {
      detailList.map((order, i) => (
        <Wrapper
          key={i.toString()}
        >
          <ContentWrapper>
            {order.name}
          </ContentWrapper>
          <Symbol>
            *
          </Symbol>
          <ContentWrapper>
            {order.quantity}
          </ContentWrapper>
          <Symbol>
            =
          </Symbol>
          <ContentWrapper>
            {(order.price * order.quantity).toFixed(2)}
          </ContentWrapper>
        </Wrapper>
      ))
    }
    </>
  );
};

export default DetailItem;

import React from 'react';
import styled from 'styled-components';
import compose from 'helper/compose';
import { isEmpty } from 'lodash';
import { useHistory } from 'react-router-dom';

import withWrapper from '../../hoc/withWrapper';

import Loading from '../Loading';
import OrderItem from './view/OrderItem';
import { LoginContainer } from '../../styles/layout';
import { Button } from '../../styles/unit';

const ItemWrapper = styled.div`
  padding: 10px;
`;

const ButtonWrapper = styled.div`
  padding: 10px;
`;

const MoveButton = styled(Button)`
`;

const index = (props) => {
  const {
    orderList,
    updateSubmitOrder,
    deleteOrder,
    clickMoveToProductHandler,
  } = props;

  return (
    <>
      <ButtonWrapper>
        <MoveButton
          onClick={clickMoveToProductHandler}
        >
          To Product
        </MoveButton>
      </ButtonWrapper>
      <ItemWrapper>
        {
          orderList.map((order, i) => (
            <OrderItem
              key={i.toString()}
              order={order}
              deleteOrder={deleteOrder}
              updateSubmitOrder={updateSubmitOrder}
            />
          ))
        }
      </ItemWrapper>
    </>
  );
};

export default compose(
  withWrapper(LoginContainer),
  (BaseComponent) => (props) => {
    const { isFetch, orderList, fetchOrder } = props;
    const history = useHistory();

    React.useEffect(
      () => {
        fetchOrder();
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    );

    const clickMoveToProductHandler = () => {
      history.push('/product');
    };

    if (isFetch) {
      return (
        <Loading
          isLoading
        />
      );
    }

    if (isEmpty(orderList)) {
      return (
        <Loading />
      );
    }

    return (
      <BaseComponent
        {...props}
        clickMoveToProductHandler={clickMoveToProductHandler}
      />
    );
  },
)(index);

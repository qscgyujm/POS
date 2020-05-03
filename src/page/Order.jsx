import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { action as orderAction } from '../redux/order';

import OrderComponent from '../components/Order';

const Order = (props) => (
  <OrderComponent
    {...props}
  />
);

const mapStateToProps = (state) => state.order;

const mapDispatchToProps = (dispatch) => {
  const {
    fetchOrder,
    updateOrder,
    deleteOrder,
    updateDealOrder,
  } = orderAction;

  return {
    ...bindActionCreators({
      fetchOrder,
      updateOrder,
      deleteOrder,
      updateDealOrder,
    }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);

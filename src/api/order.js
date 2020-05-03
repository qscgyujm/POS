import { apiRoot } from './apiRoot';

export const getOrderList = ({ token }) => {
  console.log('getOrderList', token);
  return apiRoot.get('/order', {
    headers: {
      Authorization: token,
    },
  });
};

export const createOrder = (payload) => {
  console.log(payload);
  return apiRoot.post('/order', payload, {
    headers: {
      Authorization: payload.token,
    },
  });
};

export const updateOrder = ({ payload, token }) => {
  console.log('updateOrder', payload, token);
  return apiRoot.put(`/order/${payload}`, null, {
    headers: {
      Authorization: token,
    },
  });
};

export const updateDealOrder = ({ payload, token }) => {
  console.log('updateDealOrder', payload, token);
  return apiRoot.put(`/order/deal/${payload}`, null, {
    headers: {
      Authorization: token,
    },
  });
};

export const deleteOrder = ({ id, token }) => {
  console.log('updateSubmitOrder', id, token);
  return apiRoot.delete(`/order/${id}`, {
    headers: {
      Authorization: token,
    },
  });
};

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
  return apiRoot.post('/order/create', payload, {
    headers: {
      Authorization: payload.token,
    },
  });
};

export const updateSubmitOrder = ({ payload, token }) => {
  console.log('updateSubmitOrder', payload, token);
  return apiRoot.put(`/order/submit/${payload}`, null, {
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

import { apiRoot } from './apiRoot';

export const getUserProductList = (token) => {
  console.log(token);

  return apiRoot.get('/user/product', {
    headers: {
      Authorization: token,
    },
  });
};

export const createUserProduct = (payload) => {
  console.log('createUserProduct', payload);
  const { token } = payload;

  return apiRoot.post('/user/product', payload, {
    headers: {
      Authorization: token,
    },
  });
};

export const deleteUserProduct = (payload) => {
  console.log('deleteUserProduct', payload);
  const { id, token } = payload;

  return apiRoot.delete(`/user/product/${id}`, {
    headers: {
      Authorization: token,
    },
  });
};

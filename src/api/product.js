import { apiRoot } from './apiRoot';

export const getTestProduct = () => apiRoot.get('/test/product');

export const getProductList = (token) => {
  console.log('API token', token);
  return apiRoot.get('/product/all', {
    headers: {
      Authorization: token,
    },
  });
};

export const createProduct = ({ body, token }) => {
  console.log('api', { body, token });
  return apiRoot.post('/product/create', body, {
    headers: {
      Authorization: token,
    },
  });
};

export const updateProduct = ({ id, body, token }) => {
  console.log('api', { id, body, token });

  return apiRoot.put(`/product/${id}`, body, {
    headers: {
      Authorization: token,
    },
  });
};

export const deleteProduct = (payload) => {
  console.log(payload);
  const { id, token } = payload;
  return apiRoot.delete(`/product/${id}`, {
    headers: {
      Authorization: token,
    },
  });
};

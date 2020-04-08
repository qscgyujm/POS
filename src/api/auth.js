import { apiRoot } from './apiRoot';

export const checkAuth = (token) => apiRoot.post('/auth/check', null, {
  headers: {
    Authorization: token,
  },
});

export const postLogin = ({ payload }) => apiRoot.post('/auth/login', payload, {
  contentType: 'multipart/form-data',
});

export const sendCode = (email) => {
  console.log(email);
  return apiRoot.post('/auth/sendCode', { email });
};

export const checkCode = (body) => apiRoot.post('/auth/checkCode', body);

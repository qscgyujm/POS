import { apiRoot } from './apiRoot';

export const getProfile = (token) => apiRoot.get('/user', {
  headers: {
    Authorization: token,
  },
});
export const updateProfile = ({ body, token }) => apiRoot.put('/user/profile', body, {
  headers: {
    Authorization: token,
  },
});

export const updateProfilePassword = ({ passwordObj, token }) => apiRoot.post('/user/password', passwordObj, {
  headers: {
    Authorization: token,
  },
});

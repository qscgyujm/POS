/* eslint-disable import/prefer-default-export */

import { apiRoot } from './apiRoot';

export const uploadImg = (payload) => {
  console.log('api', payload);
  const { formData, token } = payload;
  return apiRoot.post('/general/uploadImg', formData, {
    headers: {
      Authorization: token,
      contentType: 'multipart/form-data',
    },
  });
};

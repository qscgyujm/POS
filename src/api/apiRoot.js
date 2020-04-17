/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const url = 'http://localhost/api';

export const apiRoot = axios.create({
  baseURL: url,
});

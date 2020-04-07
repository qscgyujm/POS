/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const url = 'http://localhost:1337/api';

export const apiRoot = axios.create({
  baseURL: url,
});

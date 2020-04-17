/* eslint-disable import/prefer-default-export */
import axios from 'axios';

// const url = 'http://52.197.226.186:1337/api';
const url = 'https://froggy.life/api';

export const apiRoot = axios.create({
  baseURL: url,
});

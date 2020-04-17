/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const url = 'http://pos:1337';

export const apiRoot = axios.create({
  baseURL: url,
});

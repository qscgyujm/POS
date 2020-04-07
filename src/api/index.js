import * as productAPI from './product';
import * as userProductAPI from './user-product';

const API = {
  ...productAPI,
  ...userProductAPI,
};

export default API;

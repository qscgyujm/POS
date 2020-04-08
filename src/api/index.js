import * as productAPI from './product';
import * as userProductAPI from './user-product';
import * as authAPI from './auth';

const API = {
  ...authAPI,
  ...productAPI,
  ...userProductAPI,
};

export default API;

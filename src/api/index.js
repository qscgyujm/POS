import * as authAPI from './auth';
import * as fileAPI from './file';
import * as profileAPI from './profile';
import * as productAPI from './product';
import * as orderAPI from './order';
import * as userProductAPI from './user-product';

const API = {
  ...authAPI,
  ...fileAPI,
  ...profileAPI,
  ...productAPI,
  ...orderAPI,
  ...userProductAPI,
};

export default API;

/* eslint no-shadow: "off" */
import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';

import {
  saga as ProductSaga,
  reducer as ProductReducer,
} from './product';

import {
  saga as AuthSaga,
  reducer as AuthReducer,
} from './auth';

export function* rootSaga() {
  yield all([
    ...ProductSaga,
    ...AuthSaga,
  ]);
}

export const rootReducer = combineReducers({
  product: ProductReducer,
  auth: AuthReducer,
});

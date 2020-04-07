/* eslint no-shadow: "off" */
import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';

import {
  saga as ProductSaga,
  reducer as ProductReducer,
} from './product';


export function* rootSaga() {
  yield all([
    ...ProductSaga,
  ]);
}

export const rootReducer = combineReducers({
  product: ProductReducer,
});

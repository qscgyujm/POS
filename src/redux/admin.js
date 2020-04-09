/* eslint no-shadow: "off" */

import { takeLatest, call, put } from 'redux-saga/effects';

import API from '../api';

// State
const initialState = {
  productList: [],
  isFetching: false,
  isCreating: false,
  isUpdating: false,
  isError: false,
};

//  Action
const ActionType = {
  FETCH_ADMIN_PRODUCT_REQUEST: 'FETCH_ADMIN_PRODUCT_REQUEST',
  FETCH_ADMIN_PRODUCT_SUCCESS: 'FETCH_ADMIN_PRODUCT_SUCCESS',
  FETCH_ADMIN_PRODUCT_FAILURE: 'FETCH_ADMIN_PRODUCT_FAILURE',
  CREATE_ADMIN_PRODUCT_REQUEST: 'CREATE_ADMIN_PRODUCT_REQUEST',
  CREATE_ADMIN_PRODUCT_SUCCESS: 'CREATE_ADMIN_PRODUCT_SUCCESS',
  CREATE_ADMIN_PRODUCT_FAILURE: 'CREATE_ADMIN_PRODUCT_FAILURE',
  UPDATE_ADMIN_PRODUCT_REQUEST: 'UPDATE_ADMIN_PRODUCT_REQUEST',
  UPDATE_ADMIN_PRODUCT_SUCCESS: 'UPDATE_ADMIN_PRODUCT_SUCCESS',
  UPDATE_ADMIN_PRODUCT_FAILURE: 'UPDATE_ADMIN_PRODUCT_FAILURE',
  DELETE_ADMIN_PRODUCT_REQUEST: 'DELETE_ADMIN_PRODUCT_REQUEST',
  DELETE_ADMIN_PRODUCT_SUCCESS: 'DELETE_ADMIN_PRODUCT_SUCCESS',
  DELETE_ADMIN_PRODUCT_FAILURE: 'DELETE_ADMIN_PRODUCT_FAILURE',
};

export const action = {
  fetchProduct: () => ({ type: ActionType.FETCH_ADMIN_PRODUCT_REQUEST }),
  fetchProductFailure: () => ({ type: ActionType.FETCH_ADMIN_PRODUCT_FAILURE }),
  fetchProductSuccess: (productList) => ({ type: ActionType.FETCH_ADMIN_PRODUCT_SUCCESS, payload: productList }),
  createProduct: (body, resolve) => ({ type: ActionType.CREATE_ADMIN_PRODUCT_REQUEST, payload: { body, resolve } }),
  createProductFailure: () => ({ type: ActionType.CREATE_ADMIN_PRODUCT_FAILURE }),
  createProductSuccess: (productList) => ({ type: ActionType.CREATE_ADMIN_PRODUCT_SUCCESS, payload: productList }),
  updateProduct: (id, body, resolve) => ({ type: ActionType.UPDATE_ADMIN_PRODUCT_REQUEST, payload: { id, body, resolve } }),
  updateProductFailure: () => ({ type: ActionType.UPDATE_ADMIN_PRODUCT_FAILURE }),
  updateProductSuccess: (productList) => ({ type: ActionType.UPDATE_ADMIN_PRODUCT_SUCCESS, payload: productList }),
  deleteProduct: (id) => ({ type: ActionType.DELETE_ADMIN_PRODUCT_REQUEST, id }),
  deleteProductFailure: () => ({ type: ActionType.DELETE_ADMIN_PRODUCT_FAILURE }),
  deleteProductSuccess: (productList) => ({ type: ActionType.DELETE_ADMIN_PRODUCT_SUCCESS, payload: productList }),
};

// Saga

function* fetchProductSaga() {
  try {
    const token = localStorage.getItem('token');

    const { data } = yield call(API.getProductList, token);

    console.log('fetchProductSaga', data);

    yield put(action.fetchProductSuccess(data));
  } catch (error) {
    yield put(action.fetchProductSuccess());
  }
}

function* createProductSaga({ payload }) {
  try {
    const token = localStorage.getItem('token');

    console.log('createProductSaga', payload);
    const { resolve } = payload;

    const { data } = yield call(API.createProduct, { ...payload, token });

    if (resolve) {
      resolve();
    }

    yield put(action.createProductSuccess(data));
  } catch (error) {
    yield put(action.createProductFailure());
  }
}

function* updateProductSaga({ payload }) {
  try {
    console.log('updateProductSaga', payload);
    const { resolve } = payload;
    const token = localStorage.getItem('token');

    const { data } = yield call(API.updateProduct, { ...payload, token });

    if (resolve) {
      resolve();
    }

    yield put(action.updateProductSuccess(data));
  } catch (error) {
    yield put(action.updateProductFailure());
  }
}

function* deleteProductSaga(payload) {
  try {
    console.log('deleteProductSaga', payload);
    const token = localStorage.getItem('token');

    const { data } = yield call(API.deleteProduct, { ...payload, token });

    yield put(action.deleteProductSuccess(data));
  } catch (error) {
    yield put(action.deleteProductFailure());
  }
}

export const saga = [
  takeLatest(ActionType.FETCH_ADMIN_PRODUCT_REQUEST, fetchProductSaga),
  takeLatest(ActionType.CREATE_ADMIN_PRODUCT_REQUEST, createProductSaga),
  takeLatest(ActionType.UPDATE_ADMIN_PRODUCT_REQUEST, updateProductSaga),
  takeLatest(ActionType.DELETE_ADMIN_PRODUCT_REQUEST, deleteProductSaga),
];

// Reducer

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FETCH_ADMIN_PRODUCT_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ActionType.FETCH_ADMIN_PRODUCT_FAILURE:
      return {
        ...state,
        isFetching: false,
        isError: true,
      };
    case ActionType.FETCH_ADMIN_PRODUCT_SUCCESS:
      return {
        ...state,
        productList: action.payload,
        isFetching: false,
      };
    case ActionType.CREATE_ADMIN_PRODUCT_REQUEST:
      return {
        ...state,
        isCreating: true,
      };
    case ActionType.CREATE_ADMIN_PRODUCT_FAILURE:
      return {
        ...state,
        isCreating: false,
        isError: true,
      };
    case ActionType.CREATE_ADMIN_PRODUCT_SUCCESS:
      return {
        ...state,
        productList: action.payload,
        isCreating: false,
      };
    case ActionType.UPDATE_ADMIN_PRODUCT_REQUEST:
      return {
        ...state,
        isUpdating: true,
      };
    case ActionType.UPDATE_ADMIN_PRODUCT_FAILURE:
      return {
        ...state,
        isUpdating: false,
        isError: true,
      };
    case ActionType.UPDATE_ADMIN_PRODUCT_SUCCESS:
      return {
        ...state,
        productList: action.payload,
        isUpdating: false,
      };
    case ActionType.DELETE_ADMIN_PRODUCT_REQUEST:
      return {
        ...state,
        isUpdating: true,
      };
    case ActionType.DELETE_ADMIN_PRODUCT_FAILURE:
      return {
        ...state,
        isUpdating: false,
        isError: true,
      };
    case ActionType.DELETE_ADMIN_PRODUCT_SUCCESS:
      return {
        ...state,
        productList: action.payload,
        isUpdating: false,
      };
    default:
      return state;
  }
};

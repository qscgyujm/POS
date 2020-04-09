/* eslint no-shadow: "off" */

import { takeLatest, call, put } from 'redux-saga/effects';

import API from '../api';

// State
const initialState = {
  productList: [],
  deletedProducts: [],
  isFetching: false,
  isCreating: false,
  isUpdating: false,
  isError: false,
};

//  Action
const ActionType = {
  FETCH_PRODUCT_REQUEST: 'FETCH_PRODUCT_REQUEST',
  FETCH_PRODUCT_SUCCESS: 'FETCH_PRODUCT_SUCCESS',
  FETCH_PRODUCT_FAILURE: 'FETCH_PRODUCT_FAILURE',
  UPDATE_PRODUCT_FAILURE: 'UPDATE_PRODUCT_FAILURE',
  DELETE_PRODUCT_REQUEST: 'DELETE_PRODUCT_REQUEST',
  DELETE_PRODUCT_SUCCESS: 'DELETE_PRODUCT_SUCCESS',
  DELETE_PRODUCT_FAILURE: 'DELETE_PRODUCT_FAILURE',
  CREATE_ADD_PRODUCT_REQUEST: 'CREATE_ADD_PRODUCT_REQUEST',
  CREATE_ADD_PRODUCT_SUCCESS: 'CREATE_ADD_PRODUCT_SUCCESS',
  CREATE_ADD_PRODUCT_FAILURE: 'CREATE_ADD_PRODUCT_FAILURE',
};

export const action = {
  fetchProduct: () => ({ type: ActionType.FETCH_PRODUCT_REQUEST }),
  fetchProductFailure: () => ({ type: ActionType.FETCH_PRODUCT_FAILURE }),
  fetchProductSuccess: (productList, deletedProducts) => ({ type: ActionType.FETCH_PRODUCT_SUCCESS, productList, deletedProducts }),
  createAddProduct: (ids, resolve) => ({ type: ActionType.CREATE_ADD_PRODUCT_REQUEST, ids, resolve }),
  createAddProductFailure: () => ({ type: ActionType.CREATE_ADD_PRODUCT_FAILURE }),
  createAddProductSuccess: (productList, deletedProducts) => ({ type: ActionType.CREATE_ADD_PRODUCT_SUCCESS, productList, deletedProducts }),
  deleteProduct: (id) => ({ type: ActionType.DELETE_PRODUCT_REQUEST, id }),
  deleteProductFailure: () => ({ type: ActionType.DELETE_PRODUCT_FAILURE }),
  deleteProductSuccess: (productList, deletedProducts) => ({ type: ActionType.DELETE_PRODUCT_SUCCESS, productList, deletedProducts }),
};

// Saga

function* fetchProductSaga() {
  try {
    const token = localStorage.getItem('token');

    const { data } = yield call(API.getUserProductList, token);

    const { productList, deletedProducts } = data;

    yield put(action.fetchProductSuccess(productList, deletedProducts));
  } catch (error) {
    yield put(action.fetchProductFailure());
  }
}

function* createAddProductSaga(payload) {
  try {
    const token = localStorage.getItem('token');

    const { resolve } = payload;

    const { data } = yield call(API.createUserProduct, { ...payload, token });
    const { productList, deletedProducts } = data;

    if (resolve) {
      resolve(deletedProducts);
    }

    yield put(action.createAddProductSuccess(productList, deletedProducts));
  } catch (error) {
    yield put(action.createAddProductFailure());
  }
}

function* deleteProductSaga(payload) {
  try {
    const token = localStorage.getItem('token');

    const { data } = yield call(API.deleteUserProduct, { ...payload, token });
    const { productList, deletedProducts } = data;
    console.log('deleteProductSaga', data);

    yield put(action.deleteProductSuccess(productList, deletedProducts));
  } catch (error) {
    yield put(action.deleteProductFailure());
  }
}

export const saga = [
  takeLatest(ActionType.FETCH_PRODUCT_REQUEST, fetchProductSaga),
  takeLatest(ActionType.CREATE_ADD_PRODUCT_REQUEST, createAddProductSaga),
  takeLatest(ActionType.DELETE_PRODUCT_REQUEST, deleteProductSaga),
];

// Reducer

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FETCH_PRODUCT_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ActionType.FETCH_PRODUCT_FAILURE:
      return {
        ...state,
        isFetching: false,
        isError: true,
      };
    case ActionType.FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        productList: action.productList,
        deletedProducts: action.deletedProducts,
        isFetching: false,
      };
    case ActionType.CREATE_ADD_PRODUCT_REQUEST:
      return {
        ...state,
        isCreating: true,
      };
    case ActionType.CREATE_ADD_PRODUCT_FAILURE:
      return {
        ...state,
        isCreating: false,
        isError: true,
      };
    case ActionType.CREATE_ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        productList: action.productList,
        deletedProducts: action.deletedProducts,
        isCreating: false,
      };
    case ActionType.DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        isUpdating: true,
      };
    case ActionType.DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        isUpdating: false,
        isError: true,
      };
    case ActionType.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        productList: action.productList,
        deletedProducts: action.deletedProducts,
        isUpdating: false,
      };
    default:
      return state;
  }
};

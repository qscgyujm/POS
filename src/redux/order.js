import { takeLatest, call, put } from 'redux-saga/effects';

import API from '../api';

// State
const initialState = {
  orderList: [],
  isFetch: false,
  isError: false,
};

//  Action
const ActionType = {
  FETCH_ORDER_REQUEST: 'FETCH_ORDER_REQUEST',
  FETCH_ORDER_SUCCESS: 'FETCH_ORDER_SUCCESS',
  FETCH_ORDER_FAILURE: 'FETCH_ORDER_FAILURE',
  CREATE_ORDER_REQUEST: 'CREATE_ORDER_REQUEST',
  CREATE_ORDER_SUCCESS: 'CREATE_ORDER_SUCCESS',
  CREATE_ORDER_FAILURE: 'CREATE_ORDER_FAILURE',
  DELETE_ORDER_REQUEST: 'DELETE_ORDER_REQUEST',
  DELETE_ORDER_SUCCESS: 'DELETE_ORDER_SUCCESS',
  DELETE_ORDER_FAILURE: 'DELETE_ORDER_FAILURE',
  UPDATE_DEAL_ORDER_REQUEST: 'UPDATE_DEAL_ORDER_REQUEST',
  UPDATE_DEAL_ORDER_FAILURE: 'UPDATE_DEAL_ORDER_FAILURE',
  UPDATE_DEAL_ORDER_SUCCESS: 'UPDATE_DEAL_ORDER_SUCCESS',
};

export const action = {
  fetchOrder: () => ({ type: ActionType.FETCH_ORDER_REQUEST }),
  fetchOrderSuccess: (orderList) => ({ type: ActionType.FETCH_ORDER_SUCCESS, payload: orderList }),
  fetchOrderFailure: () => ({ type: ActionType.FETCH_ORDER_FAILURE }),
  createOrder: (order, resolve) => ({ type: ActionType.CREATE_ORDER_REQUEST, payload: { order, resolve } }),
  createOrderSuccess: () => ({ type: ActionType.CREATE_ORDER_SUCCESS }),
  createOrderFailure: () => ({ type: ActionType.CREATE_ORDER_FAILURE }),
  deleteOrder: (orderId) => ({ type: ActionType.DELETE_ORDER_REQUEST, payload: orderId }),
  deleteOrderSuccess: (orderList) => ({ type: ActionType.DELETE_ORDER_SUCCESS, payload: orderList }),
  deleteOrderFailure: () => ({ type: ActionType.DELETE_ORDER_FAILURE }),
  updateDealOrder: (orderId) => ({ type: ActionType.UPDATE_DEAL_ORDER_REQUEST, payload: orderId }),
  updateDealOrderSuccess: (orderList) => ({ type: ActionType.UPDATE_DEAL_ORDER_SUCCESS, payload: orderList }),
  updateDealOrderFailure: () => ({ type: ActionType.UPDATE_DEAL_ORDER_FAILURE }),
};

// Saga

function* fetchOrderSaga() {
  try {
    const token = localStorage.getItem('token');

    const { data } = yield call(API.getOrderList, { token });
    const { orderDetailList } = data;

    yield put(action.fetchOrderSuccess(orderDetailList));
  } catch (error) {
    yield put(action.fetchOrderFailure());
  }
}

function* createOrderSaga({ payload }) {
  try {
    console.log('createOrderSaga', payload);

    const token = localStorage.getItem('token');
    const { resolve } = payload;

    yield call(API.createOrder, { ...payload, token });

    if (resolve) {
      resolve();
    }

    yield put(action.createOrderSuccess());
  } catch (error) {
    yield put(action.createOrderFailure());
  }
}

function* updateDealOrderSaga({ payload }) {
  try {
    console.log('updateDealOrderSaga', payload);

    const token = localStorage.getItem('token');

    const { data } = yield call(API.updateDealOrder, { payload, token });
    const { orderDetailList } = data;
    console.log('orderDetailList', orderDetailList);

    yield put(action.updateDealOrderSuccess(orderDetailList));
  } catch (error) {
    yield put(action.updateDealOrderFailure());
  }
}

function* deleteOrderSaga({ payload }) {
  try {
    console.log('deleteOrderSaga', payload);

    const token = localStorage.getItem('token');

    const { data } = yield call(API.deleteOrder, { id: payload, token });
    const { orderDetailList } = data;
    console.log('data', data);

    yield put(action.deleteOrderSuccess(orderDetailList));
  } catch (error) {
    yield put(action.deleteOrderFailure());
  }
}

export const saga = [
  takeLatest(ActionType.FETCH_ORDER_REQUEST, fetchOrderSaga),
  takeLatest(ActionType.CREATE_ORDER_REQUEST, createOrderSaga),
  takeLatest(ActionType.UPDATE_DEAL_ORDER_REQUEST, updateDealOrderSaga),
  takeLatest(ActionType.DELETE_ORDER_REQUEST, deleteOrderSaga),
];

// Reducer

/* eslint-disable */
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FETCH_ORDER_REQUEST:
      return {
        ...state,
        isFetch: true,
      };
    case ActionType.FETCH_ORDER_FAILURE:
      return {
        ...state,
        isError: true,
        isFetch: false,
      };
    case ActionType.FETCH_ORDER_SUCCESS:
      return {
        ...state,
        isFetch: false,
        orderList: action.payload,
      };
    case ActionType.CREATE_ORDER_REQUEST:
      return {
        ...state,
        isFetch: true,
      };
    case ActionType.CREATE_ORDER_FAILURE:
      return {
        ...state,
        isError: true,
        isFetch: false,
      };
    case ActionType.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        isFetch: false,
      };
    case ActionType.UPDATE_DEAL_ORDER_REQUEST:
      return {
        ...state,
        isFetch: true,
      };
    case ActionType.UPDATE_DEAL_ORDER_FAILURE:
      return {
        ...state,
        isError: true,
        isFetch: false,
      };
    case ActionType.UPDATE_DEAL_ORDER_SUCCESS:
      return {
        ...state,
        isFetch: false,
        orderList: action.payload,
      };
    case ActionType.DELETE_ORDER_REQUEST:
      return {
        ...state,
        isFetch: true,
      };
    case ActionType.DELETE_ORDER_FAILURE:
      return {
        ...state,
        isError: true,
        isFetch: false,
      };
    case ActionType.DELETE_ORDER_SUCCESS:
      return {
        ...state,
        isFetch: false,
        orderList: action.payload,
      };
    default:
      return state;
  }
};

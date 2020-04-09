import { takeLatest, call, put } from 'redux-saga/effects';

import API from '../api';

// State
const initialState = {
  isFetch: false,
  isError: false,
};

//  Action
const ActionType = {
  UPLOAD_IMAGE_REQUEST: 'UPLOAD_IMAGE_REQUEST',
  UPLOAD_IMAGE_SUCCESS: 'UPLOAD_IMAGE_SUCCESS',
  UPLOAD_IMAGE_FAILURE: 'UPLOAD_IMAGE_FAILURE',
};

export const action = {
  uploadImg: (formData, resolve) => ({ type: ActionType.UPLOAD_IMAGE_REQUEST, payload: { formData, resolve } }),
  uploadImgSuccess: () => ({ ype: ActionType.UPLOAD_IMAGE_SUCCESS }),
  uploadImgFailure: () => ({ type: ActionType.UPLOAD_IMAGE_FAILURE }),
};

// Saga

function* uploadImgSaga({ payload }) {
  try {
    console.log('uploadImgSaga', payload);

    const { formData, resolve } = payload;

    const token = localStorage.getItem('token');

    const { data } = yield call(API.uploadImg, { formData, token });

    resolve(data);

    yield put(action.uploadImgSuccess());
  } catch (error) {
    // console.log(error);
    yield put(action.uploadImgFailure());
  }
}


export const saga = [
  takeLatest(ActionType.UPLOAD_IMAGE_REQUEST, uploadImgSaga),
];

// Reducer

// eslint-disable-next-line
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.UPLOAD_IMAGE_REQUEST:
      return {
        ...state,
        isFetch: true,
      };
    case ActionType.UPLOAD_IMAGE_FAILURE:
      return {
        ...state,
        isError: true,
      };
    case ActionType.UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        isFetch: false,
      };
    default:
      return state;
  }
};

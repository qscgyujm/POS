import { all, takeLatest, delay, put, call } from 'redux-saga/effects';

import { getTestProduct } from '../api/index';

function* helloSaga() {
  console.log('delay');
  yield delay(1000);
  console.log('Hello Sagas!');

  try {
    const { data } = yield call(getTestProduct);
    console.log('res', data);
    
  } catch (error) {
    console.log('error', error);
  }
}

function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT' })
}

function* sayHelloAsync(){
  yield takeLatest('hello', helloSaga);
}


function* watchIncrementAsync() {
  yield takeLatest('INCREMENT_ASYNC', incrementAsync)
}


export default function* rootSaga(){
  yield all([
    sayHelloAsync(),
    watchIncrementAsync(),
  ])
}
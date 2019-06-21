import {
  call,
  put,
  all,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';


import Actions from '../actions';
import apiClient from '../utils/apiClient';

const { Universal } = Actions;

function* requestModule(action) {
  try {
    yield put({ type: 'FETCH_MODULE', process: action.process });
    const params = Object.assign({}, {
      microservice: action.microservice || 'service',
      module: 'about',
      query: {},
      method: 'get',
      data: {},
    }, action);

    if (action.dispatchBefore) {
      yield put({ type: action.dispatchBefore, action, flow: 'init' });
    }

    const response = yield call(apiClient, params);
    if (action.dispatchAction) {
      yield put({ type: action.dispatchAction, payload: response, flow: 'end' });
    } else {
      if (params.method === 'get') {
        yield put(Universal.fetchSuccess(params.module, Object.assign({}, params, response)));
      }
      if (params.method === 'patch') {
        yield put(Universal.updateSuccess(params.module, Object.assign({}, params, response)));
      }
    }

    yield put({ type: 'FETCH_REQUEST_END' });
    if (action.dispatchFinal) {
      yield put({
        type: action.dispatchFinal,
        action,
        payload: response,
        error: false,
        flow: 'end',
      });
    }
  } catch (e) {
    yield put(Universal.requestError(action.module, {
      payload: { ...action.payload, error: e },
    }));
  }
}

function* initAppState() {
  try {
    yield all([]);
  } catch (e) {
    console.error('Error initialState: ', e);
  }
}


function* mySaga() {
  try {
    yield takeLatest('INIT_APP_STATE', initAppState);
    yield takeEvery([
      'UNIVERSAL_REMOVE_MODULE',
      'UNIVERSAL_UPDATE_MODULE',
      'UNIVERSAL_INSERT_MODULE',
      'UNIVERSAL_FETCH_MODULE',
    ], requestModule);
  } catch (err) {
    console.error('mySaga Error: ', err);
  }
}


export default mySaga;

/* --------------------------------------------------------
* Author Ngô An Ninh
* Email ninh.uit@gmail.com
* Phone 0978108807
*
* Created: 2018-04-18 22:19:12
*------------------------------------------------------- */
import { take, call, put, cancel, fork } from 'redux-saga/effects';

import fetchApi from '../utils/FetchApi';
import AuthStorage from '../utils/AuthStorage';

function* authorize(email, password, next) {
  try {
    const response = yield call(fetchApi, {
      uri: 'users/login?include=user',
      params: { email, password },
      opt: { method: 'POST' },
      loading: false,
    });
    if (response && !response.error) {
      const data = {
        token: response.id,
        userId: response.userId,
        loginType: response.user.loginType,
      };
      yield call(AuthStorage.setValue, data, next);

      yield put({
        type: 'LOGIN_SUCCESS',
        payload: response.user,
      });
    } else {
      yield put({
        type: 'LOGIN_FAILED',
        payload: response,
      });
    }
  } catch (err) {
    console.log('err', err);
  }
}

function* loginFlow() {
  const INFINITE = true;

  while (INFINITE) {
    const { payload: { email, password }, next } = yield take('LOGIN_REQUEST');
    const authorizeTask = yield fork(authorize, email, password, next);
    const action = yield take(['LOGOUT_REQUEST', 'LOGIN_FAILED', 'REQUEST_ERROR']);

    if (action.type === 'LOGOUT_REQUEST') {
      yield cancel(authorizeTask);
    }
  }
}

function* logoutFlow() {
  const INFINITE = true;

  while (INFINITE) {
    const { next } = yield take('LOGOUT_REQUEST');
    try {
      const response = yield call(fetchApi, {
        uri: 'users/logout',
        opt: { method: 'POST' },
      });

      if (response && !response.error) {
        yield call(AuthStorage.destroy, next);

        yield put({ type: 'LOGOUT_SUCCESS' });
      }
    } catch (err) {
      yield put({ type: 'REQUEST_ERROR', payload: err });
    }
  }
}

export default function* authFlow() {
  yield fork(loginFlow);
  yield fork(logoutFlow);
}

/* --------------------------------------------------------
* Author Ngô An Ninh
* Email ninh.uit@gmail.com
* Phone 0978108807
*
* Created: 2018-04-16 10:51:57
*------------------------------------------------------- */
import {Map} from 'immutable';
import AuthStorage from 'src/utils/AuthStorage';

// Initial state
const initialState = Map({
  userInfo: {},
  loading: false,
  error: ''
});

function auth(state = initialState, action = {}) {
  switch (action.type) {
		case 'LOGIN_REQUEST':
			return state.set('error', '').set('loading', true);
    case 'LOGIN_SUCCESS':
			return state.set('userInfo', action.payload).set('loading', false);
		case 'GET_USER_SUCCESS':
			return state.set('userInfo', action.payload);
		case 'GET_USER_ERROR':
			return state.set('error', action.payload || '').set('loading', false).set('userInfo', {});
    case 'LOGIN_FAILED':
			return state.set('error', action.payload || '').set('loading', false);
    case 'LOGOUT_SUCCESS':
      return state.set('userInfo', {});
    default:
      return state;
  }
}

export default auth;

/* --------------------------------------------------------
* Author Ngô An Ninh
* Email ninh.uit@gmail.com
* Phone 0978108807
*
* Created: 2018-04-16 10:51:57
*------------------------------------------------------- */
import {Map} from 'immutable';
// Initial state
const initialState = Map({
  userInfo: {},
  loading: false,
  error: ''
});

export function loginRequest(payload, next, nextError) {
	return {
		type: 'LOGIN_REQUEST',
		payload
	};
}

export function logoutRequest(next) {
	return {
		type: 'LOGOUT_REQUEST'
	};
}

export const getStudentList = (payload, next, nextError) => {
	return {
		type: 'SINGLE_API',
		payload: {
			uri: `students?filter=${JSON.stringify(payload.filter)}`,
			afterSuccess: next,
			afterError: nextError
		},
	};
};

export const getTracking = (payload, next, nextError) => {
	return {
		type: 'SINGLE_API',
		payload: {
			uri: `trackings?filter=${JSON.stringify(payload.filter)}`,
			afterSuccess: next,
			afterError: nextError
		}
	};
};

function auth(state = initialState, action = {}) {
  switch (action.type) {
		case 'LOGIN_REQUEST':
			return state.set('error', '').set('loading', true);
    case 'LOGIN_SUCCESS':
			return state.set('userInfo', action.payload).set('loading', false);
    case 'LOGIN_FAILED':
			return state.set('error', action.payload || '').set('loading', true);
    case 'LOGOUT_SUCCESS':
      return state.set('userInfo', {});
    default:
      return state;
  }
}

export default auth;

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

export function loginRequest(payload, next) {
	return {
		type: 'LOGIN_REQUEST',
		payload,
		next,
	};
}

export function logoutRequest(next) {
	return {
		type: 'LOGOUT_REQUEST',
		next,
	};
}

export const getStudentList = (payload, next, nextError) => {
	return {
		type: 'SINGLE_API',
		payload: {
			uri: `students?filter=${JSON.stringify(payload.filter)}`,
			afterSuccess: next,
			afterError: nextError,
		},
	};
};

function auth(state = initialState, action = {}) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return state.set('userInfo', action.payload);
    case 'LOGIN_FAILED':
      return state.set('error', action.payload || '');
    case 'LOGOUT_SUCCESS':
      return state.set('userInfo', {});
    default:
      return state;
  }
}

export default auth;

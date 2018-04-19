/* --------------------------------------------------------
* Author Ngô An Ninh
* Email ninh.uit@gmail.com
* Phone 0978108807
*
* Created: 2018-04-19 15:01:32
*------------------------------------------------------- */
import { Map } from 'immutable';
// Initial state
const initialState = Map({
	sending: true,
	error: ''
});

export function toggleLoader() {
	return {
		type: 'TOGGLE_LOADING'
	};
}

export function startLoader() {
	return {
		type: 'START_LOADING'
	};
}

export function stopLoader() {
	return {
		type: 'STOP_LOADING'
	};
}

export default function (state = initialState, action) {
	switch (action.type) {
		case 'TOGGLE_LOADING':
			return state.update('sending', value => !value)
		case 'START_LOADING':
			return state.set('sending', true)
		case 'STOP_LOADING':
			return state.set('sending', false)
		case 'REQUEST_ERROR':
			return state.set('sending', false)
				.set('error', action.payload)
		default:
			return state;
	}
}

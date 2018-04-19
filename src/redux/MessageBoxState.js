/* --------------------------------------------------------
* Author Ngô An Ninh
* Email ninh.uit@gmail.com
* Phone 0978108807
*
* Created: 2018-04-16 10:51:57
*------------------------------------------------------- */
import { Map } from 'immutable';
// Initial state
const initialState = Map({
	isOpen: false,
	message: '',
	type: ''
});

export function toggleMessageBox(payload, next) {
	return {
		type: 'TOGGLE_MESSAGE_BOX',
		payload,
		next
	};
}

export default function (state = initialState, action) {
	switch (action.type) {
		case 'TOGGLE_MESSAGE_BOX':
			return state
				.update('isOpen', value => !value)
				.set('message', action.payload ? action.payload.message : '')
				.set('type', action.payload ? action.payload.type : 'info')
		default:
			return state;
	}
}

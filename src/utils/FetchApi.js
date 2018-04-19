/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2017-12-15 23:36:07
*------------------------------------------------------- */
import merge from 'lodash/merge';
import { put, call } from 'redux-saga/effects';

import constants from '../constants';
import AuthStorage from './AuthStorage';

const { API_BASE_URL } = constants;

const fetching = (url, options) => fetch(API_BASE_URL + url, options)
	.then(response => {
		return response.status === 204 || response.statusText === 'No Content' ? {} : response.json();
	})
	.then(json => {
		if (json.error) {
			throw json.error;
		} else {
			return json;
		}
	})
	.catch(err => {
		throw err;
	});

// export const uploadImage = function* (url, params) {
// 	const options = {
// 		method: 'POST',
// 		headers: {},
// 		body: params,
// 	};

// 	// set token
// 	if (AuthStorage.loggedIn) {
// 		options.headers.Authorization = AuthStorage.token;
// 	}

// 	yield put({ type: 'TOGGLE_LOADING' });

// 	let response;
// 	try {
// 		response = yield call(fetching, url, options);
// 		yield put({ type: 'TOGGLE_LOADING' });
// 	} catch (error) {
// 		response = { error };
// 		yield put({ type: 'REQUEST_ERROR', payload: error.message || error });
// 	}
// 	return response;
// };

// export const deleteImage = function* (container, file) {
// 	const options = {
// 		method: 'DELETE',
// 		headers: {},
// 	};

// 	// set token
// 	if (AuthStorage.loggedIn) {
// 		options.headers.Authorization = AuthStorage.token;
// 	}

// 	// if (params) {
// 	// 	//options.body = JSON.stringify(params);
// 	// }

// 	yield put({ type: 'TOGGLE_LOADING' });

// 	let response;
// 	try {
// 		response = yield call(fetching, `attachments/${container}/files/${file}`, options);
// 		yield put({ type: 'TOGGLE_LOADING' });
// 	} catch (error) {
// 		response = { error };
// 		// yield put({ type: 'REQUEST_ERROR', payload: error.message || error });
// 	}
// 	return response;
// };

/*
* Params: {
	uri: ,
	params: ,
	opt: ,
	loading: ,
	uploadImg: ,
}
*/

export default function* ({ uri, params = {}, opt = {}, loading = true, uploadImg = false }) {
	const defaultOptions = {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
	};

	if (!uri) {
		return;
	}

	const options = merge(defaultOptions, opt);

	if (uploadImg && params.files) {
		options.headers = {};
	}

	// set token
	if (AuthStorage.loggedIn) {
		options.headers.Authorization = AuthStorage.token;
	}

	let url = uri;

	if (params && Object.keys(params).length > 0) {
		if (options && options.method === 'GET') {
			url += '?' + Object.keys(params).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&');
		} else if (uploadImg && params.files) {
			const formData = new FormData();
			params.files.forEach((img) => {
				formData.append('files', img, img.name);
			});

			options.body = formData;
		} else {
			options.body = JSON.stringify(params);
		}
	}

	if (loading) {
		yield put({ type: 'TOGGLE_LOADING' });
	}

	let response;
	try {
		console.info('====> Call /api/v1/' + url, ', options=', options);

		response = yield call(fetching, url, options);
		if (loading) {
			yield put({ type: 'TOGGLE_LOADING' });
		}
	} catch (error) {
		response = { error };
		if (error.statusCode === 401 && (error.code === 'INVALID_TOKEN' || error.code === 'AUTHORIZATION_REQUIRED')) {
			// token is expired
			yield call(AuthStorage.destroy);
			yield put({ type: 'LOGOUT_SUCCESS' });

			if (loading) {
				yield put({ type: 'TOGGLE_LOADING' });
			}
		} else {
			if (loading) {
				yield put({ type: 'REQUEST_ERROR', payload: error.message || error });
				yield put({ type: 'TOGGLE_MESSAGE_BOX', payload: { message: error.message || error, type: 'error' } });
			}
		}
	}
	return response;
}

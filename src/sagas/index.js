/* --------------------------------------------------------
* Author Ngô An Ninh
* Email ninh.uit@gmail.com
* Phone 0978108807
*
* Created: 2018-04-18 17:26:01
*------------------------------------------------------- */

import { fork } from 'redux-saga/effects';

// import auth from './auth';
import middleware from './middleware';

export function* startup() {
	yield console.log('Hello Redux-Saga');
}

export default function* root() {
	yield fork(startup);
	yield fork(middleware);

	// combine your saga here
	// yield fork(auth);
}

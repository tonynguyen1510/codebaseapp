/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2017-12-15 23:36:23
*------------------------------------------------------- */

import { AsyncStorage } from 'react-native';

const mandatory = () => {
	throw new Error('Missing parameter!');
};

class Storage {
	constructor(name = mandatory()) {
		this.name = name;

		AsyncStorage.getItem(this.name, (err, result) => {
			let value = {};
			try {
				value = JSON.parse(result);
			} catch (er) {
				value = result;
			}
			this.value = value;
		});
	}

	setValue = async (value = mandatory(), next) => {
		await AsyncStorage.setItem(this.name, JSON.stringify(value), (err) => {
			if (err) {
				console.log('err', err);
				next(err);
			} else {
				this.value = value;
				if (next && typeof next === 'function') {
					next();
				}
			}
		});
	}

	destroy = async (next) => {
		await AsyncStorage.removeItem(this.name, (err) => {
			if (err) {
				console.log('err', err);
				next(err);
			} else {
				this.value = {};
				if (next && typeof next === 'function') {
					next();
				}
			}
		});
	}
}

export default Storage;

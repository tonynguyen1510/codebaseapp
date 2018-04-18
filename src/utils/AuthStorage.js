/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2017-12-15 23:35:57
*------------------------------------------------------- */
import Storage from './Storage';

// const auth = new Storage('AUTH');

class AuthStorage extends Storage {
	get loggedIn() {
		return !!this.value && !!this.value.token;
	}

	get token() {
		return this.value && this.value.token;
	}

	get userId() {
		return this.value && this.value.userId;
	}

	get loginType() {
		return this.value && this.value.loginType;
	}


}

export default new AuthStorage('AUTH');


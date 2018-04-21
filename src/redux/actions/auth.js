
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

export function loginFacebook(payload, next) {
	return {
		type: 'LOGIN_FACEBOOK',
		payload,
		next,
	};
}

export function loginGoogle(payload, next) {
	return {
		type: 'LOGIN_GOOGLE',
		payload,
		next,
	};
}

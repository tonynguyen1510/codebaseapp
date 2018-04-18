/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2017-12-17 11:04:43
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';
// import { StyleSheet } from 'react-native';

import Input from './';

// const styles = StyleSheet.create({
// 	container: {},
// });

const InputReduxForm = ({ input, meta: { touched, error/* , warning */ }, ...props }) => {
	return (
		<Input
			{...props}
			{...input}
			error={touched && error}
			success={!error}
		/>
	);
};

InputReduxForm.propTypes = {
	input: PropTypes.object,
	meta: PropTypes.object,
	returnKeyType: PropTypes.string,
};

InputReduxForm.defaultProps = {
	returnKeyType: 'next',
};

export default InputReduxForm;

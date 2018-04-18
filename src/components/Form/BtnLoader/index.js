/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2017-12-17 16:47:23
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import {
	Button,
	Text,
	Icon,
	Spinner,
} from 'native-base';

const BtnLoader = ({ icon, loading, text, onPress, ...restOfProps }) => {
	return (
		<Button
			{...restOfProps}
			onPress={!loading ? onPress : f => f}
		>
			{
				loading ? <Spinner color="#fff" size="small" /> : [
					icon && <Icon key="1" name={icon} style={{ fontSize: 24, color: '#fff', marginRight: 10 }} />,
					<Text key="2">{text}</Text>,
				]
			}
		</Button>
	);
};

BtnLoader.propTypes = {
	loading: PropTypes.bool.isRequired,
	text: PropTypes.string.isRequired,
	onPress: PropTypes.func.isRequired,
	icon: PropTypes.string,
};

export default BtnLoader;

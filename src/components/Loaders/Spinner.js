/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2017-12-17 16:31:49
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Container, Spinner } from 'native-base';

function mapStateToProps(state) {
	return {
		loading: state.getIn(['loader', 'sending'])
	};
}

const mapDispatchToProps = {};

const AppSpinner = (props) => {
	const { loading } = props;

	return loading ? (
		<Container style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', position: 'absolute', zIndex: 999999, height: '100%', width: '100%', top: 0, bottom: 0, right: 0, left: 0, flex: 1 }}>
			<Spinner color="#fbca08" />
		</Container>
	) : null;
};

AppSpinner.propTypes = {
	loading: PropTypes.bool.isRequired,
};

AppSpinner.defaultProps = {
	// loading: true,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppSpinner);


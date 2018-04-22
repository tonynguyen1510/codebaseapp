import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	Header,
	Title,
	Button,
	Icon,
	Left,
	Body,
	Right,
	View,
	Text
} from 'native-base';
import color from '../../constants/color';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';


function mapStateToProps(state) {
	return {
		auth: state.get('auth').toJS(),
		loader: state.get('loader').toJS()
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		navigate: bindActionCreators(NavigationActions.navigate, dispatch)
	}
};

@connect(mapStateToProps, mapDispatchToProps)
class AppHeader extends Component {
	static propTypes = {
		name: PropTypes.string,
		hasBack: PropTypes.bool,
		auth: PropTypes.object.isRequired,
		navigate: PropTypes.func.isRequired
	};

	render() {
		const { name, navigate, hasBack, auth } = this.props;

		return (
			<View>
				<Text>Good day, {auth.userInfo ? auth.userInfo.fullName : ''} </Text>
			</View>
		);
	}
}
export default AppHeader;

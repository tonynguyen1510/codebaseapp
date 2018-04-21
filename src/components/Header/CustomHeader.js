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
		userInfo: state.getIn(['auth', 'userInfo']).toJS(),
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
		userInfo: PropTypes.object.isRequired,
		navigate: PropTypes.func.isRequired
	};

	render() {
		const { name, navigate, hasBack, userInfo } = this.props;
		console.log('userInfo', userInfo)
		return (
			<View>
				<Text>Good day, {userInfo.fullName} </Text>
			</View>
		);
	}
}
export default AppHeader;

/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 *
 * LastModified: 2017-12-16 01:46:04
 *-------------------------------------------------------*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
	Button,
	Text,
	Icon,
} from 'native-base';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

import AuthStorage from '../../../utils/AuthStorage';
import { loginFacebook } from '../../../redux/actions/auth';
import { toggleMessageBox } from 'src/redux/store/MessageBoxState';


class BtnFbLogin extends Component {
	static propTypes = {
		navigate: PropTypes.func.isRequired,
		loginFacebook: PropTypes.func.isRequired,
		toggleMessageBox: PropTypes.func.isRequired
	}

	handleLoginFb = () => {
		LoginManager.logInWithReadPermissions(['public_profile']).then((result) => {
			if (result.isCancelled) {
				console.log('Login was cancelled');
			} else {
				AccessToken.getCurrentAccessToken().then((data) => {
					console.log('data', data);
					const { accessToken } = data;

					if (!accessToken) {
						this.props.toggleMessageBox({
							message: 'AccessToken not found',
							type: 'error'
						});

						return;
					}

					this.props.loginFacebook({ accessToken }, () => {
						if (AuthStorage.loggedIn) {
							this.props.navigate({ routeName: 'Home' });
						}
					});
				});
			}
		}, (error) => {
			this.props.toggleMessageBox({
				message: `Login failed with error: ${error}`,
				type: 'error',
			});
		});
	}

	render() {
		return (
			<Button
				iconLeft
				block
				style={{ marginBottom: 15 }}
				onPress={this.handleLoginFb}
			>
				<Icon name="logo-facebook" style={{ fontSize: 24, color: '#fff', marginRight: 10 }} />
				<Text>Facebook</Text>
			</Button>
		);
	}
}

function mapStateToProps(state) {
	return {
		// auth: state.auth
	};
}

const mapDispatchToProps = {
	loginFacebook,
	toggleMessageBox,
};

export default connect(mapStateToProps, mapDispatchToProps)(BtnFbLogin);

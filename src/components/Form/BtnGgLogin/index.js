/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 *
 * LastModified: 2017-07-30 10:55:40
 *-------------------------------------------------------*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
	Button,
	Text,
	Icon,
} from 'native-base';
import { GoogleSignin } from 'react-native-google-signin';

import AuthStorage from 'src/utils/AuthStorage';

import { loginGoogle } from 'src/redux/actions/auth';
import { toggleMessageBox } from 'src/redux/store/MessageBoxState';

class BtnGgLogin extends Component {
	static propTypes = {
		navigate: PropTypes.func.isRequired,
		loginGoogle: PropTypes.func.isRequired,
		toggleMessageBox: PropTypes.func.isRequired,
	}

	componentWillMount() {
		GoogleSignin.hasPlayServices({ autoResolve: true });
		GoogleSignin.configure({
			androidClientId: '502795845770-fbop0ejs9dltq1jq1ao80tqap3g9g5af.apps.googleusercontent.com',
			iosClientId: '502795845770-fbop0ejs9dltq1jq1ao80tqap3g9g5af.apps.googleusercontent.com',
			webClientId: '502795845770-gcps0fn2j1dcrfan99ntvvbru3dbkomr.apps.googleusercontent.com',
			offlineAccess: true,
		});
	}

	handleLogin = () => {
		GoogleSignin.signIn().then((result) => {
			console.log('result', result);
			const accessToken = result.accessToken;

			if (!accessToken) {
				this.props.toggleMessageBox({
					message: 'AccessToken not found',
					type: 'error',
				});

				return;
			}

			this.props.loginGoogle({ accessToken }, () => {
				if (AuthStorage.loggedIn) {
					this.props.navigate({ routeName: 'Color' });
				}
			});
		}).catch((err) => {
			console.log('WRONG SIGNIN', err);
			this.props.toggleMessageBox({
				message: `Login failed with error: ${err}`,
				type: 'error',
			});
		}).done();
	}

	render() {
		return (
			<Button
				iconLeft
				danger
				block
				onPress={this.handleLogin}
			>
				<Icon name="logo-googleplus" style={{ fontSize: 24, color: '#fff', marginRight: 10 }} />
				<Text>Google+</Text>
			</Button>
		);
	}
}

function mapStateToProps(/* state */) {
	return {
		// auth: state.auth
	};
}

const mapDispatchToProps = {
	loginGoogle,
	toggleMessageBox,
};

export default connect(mapStateToProps, mapDispatchToProps)(BtnGgLogin);

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

import AuthStorage from '../../../utils/AuthStorage';

import { loginGoogle } from '../../../modules/auth/AuthState';
import { toggleMessageBox } from '../../../redux/MessageBoxState';

class BtnGgLogin extends Component {
	static propTypes = {
		navigate: PropTypes.func.isRequired,
		loginGoogle: PropTypes.func.isRequired,
		toggleMessageBox: PropTypes.func.isRequired,
	}

	componentWillMount() {
		GoogleSignin.hasPlayServices({ autoResolve: true });
		GoogleSignin.configure({
			iosClientId: '356281179752-b2dvl8fhunurcbr1ilktvn09h0k6gf9u.apps.googleusercontent.com',
			webClientId: '644292004780-4smqm48dgpn584kd1tg7i2s32g0h1oto.apps.googleusercontent.com',
			offlineAccess: true,
		});
	}

	handleLogin = () => {
		GoogleSignin.signIn().then((result) => {
			console.log('result', result);
			const accessToken = result.idToken;

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

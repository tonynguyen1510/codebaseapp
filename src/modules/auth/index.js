/* --------------------------------------------------------
* Author Ngô An Ninh
* Email ninh.uit@gmail.com
* Phone 0978108807
*
* Created: 2018-04-17 13:05:58
*------------------------------------------------------- */
import React, { PureComponent } from 'react';
import { Container } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoginContainer from './Login';
import SignUp from './SignUp';
import ForgotPass from './ForgotPass';

function mapStateToProps(state) {
	return {
	};
}

const mapDispatchToProps = {
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Auth extends PureComponent {
	static propTypes = {
	}

	state = {
		mode: 'login'
	}

	changeMode = (mode) => {
		this.setState({ mode: mode });
	};

	render() {
		return (
			<Container>
				{this.state.mode === 'login' &&
					<LoginContainer changeMode={this.changeMode} />
				}
				{this.state.mode === 'signup' &&
					<SignUp changeMode={this.changeMode} />
				}
				{this.state.mode === 'forgotpass' &&
					<ForgotPass changeMode={this.changeMode} />
				}
			</Container>
		);
	}
}

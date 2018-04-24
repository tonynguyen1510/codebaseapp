import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, propTypes } from 'redux-form';
import {
	Container,
	Content,
	Button,
	View,
	Text,
} from 'native-base';

import Input from 'src/components/Form/Input/ReduxForm';
import BtnLoader from 'src/components/Form/BtnLoader';

import { required, email, aol } from 'src/utils/validate';

import styles from './styles';

function mapStateToProps(/* state */) {
	return {
		// requestStatus: state.requestStatus
	};
}

const mapDispatchToProps = {
	// setUser
};

@reduxForm({
	form: 'forgotPass',
})
@connect(mapStateToProps, mapDispatchToProps)
export default class ForgotPass extends Component {
	static propTypes = {
		...propTypes,
		changeMode: PropTypes.func.isRequired,
	}

	state = {
		loading: false,
		// hasError: false,
	}

	handlePress = (data) => {
		this.setState({
			loading: true,
			// hasError: false,
		});
		console.log('data', data);
	}

	render() {
		const { handleSubmit, submitting } = this.props;

		return (
			<Container style={styles.container}>
				<Content style={{ padding: 20 }}>
					<View>
						<Field
							name="email"
							label="Email"
							autoCapitalize="none"
							icon="ios-mail-outline"
							component={Input}
							validate={[required, email, aol]}
						/>
						<BtnLoader
							block
							info
							style={styles.btn}
							onPress={handleSubmit(this.handlePress)}
							text="Đặt lại mật khẩu"
							loading={this.state.loading || submitting}
						/>
						<View style={{ marginTop: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
							<Text>Bạn đã có tài khoản?</Text>
							<Button
								style={{ marginRight: -16 }}
								transparent
								onPress={() => this.props.changeMode('login')}
							>
								<Text>Đăng nhập</Text>
							</Button>
						</View>
					</View>

				</Content>
			</Container>
		);
	}
}

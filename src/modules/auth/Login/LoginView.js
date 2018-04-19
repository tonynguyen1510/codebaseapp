/* --------------------------------------------------------
* Author Ngô An Ninh
* Email ninh.uit@gmail.com
* Phone 0978108807
*
* Created: 2018-04-16 10:58:15
*------------------------------------------------------- */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Container,
	Content,
	Button,
	View,
	Text,
} from 'native-base';
import styles from './styles';
import { Field, reduxForm, propTypes } from 'redux-form/immutable';
import Input from '../../../components/Form/Input/ReduxForm';
import BtnLoader from '../../../components/Form/BtnLoader';
import BtnFbLogin from '../../../components/Form/BtnFbLogin';
import { required, minLength, email, aol } from '../../../utils/validate';
import AuthStorage from '../../../utils/AuthStorage';
const minLength6 = minLength(6);

@reduxForm({
  form: 'login',
  initialValues: {
    email: 'admin@gmail.com',
    password: '123456',
  },
})
export default class LoginView extends Component {
  static propTypes = {
		...propTypes,
		auth: PropTypes.object,
    navigate: PropTypes.func.isRequired,
    authStateActions: PropTypes.shape({
			getStudentList: PropTypes.func.isRequired,
			loginRequest: PropTypes.func.isRequired,
			getTracking: PropTypes.func.isRequired
    }),
  }

	static defaultProps = {}
	state = {
		loading: false,
		hasError: false,
	}

	componentWillMount() {
		if (AuthStorage.loggedIn) {
			this.props.navigate({ routeName: 'Color' });
		}
	}
	componentWillReceiveProps(nextProps) {
		const { auth } = nextProps;
		if (auth.error && this.state.loading) {
			this.setState({
				loading: false,
				hasError: true
			});
		}
	}
	handlePressSubmit = (data) => {
		this.setState({
			loading: true,
			hasError: false
		});
		this.props.authStateActions.loginRequest(data.toJS());
	}
	testApi = () => {
		this.props.authStateActions.getTracking({ filter: {} }, (res) => {
			console.log('res', res);
		})
	}

  render() {
		const { navigate, handleSubmit, submitting } = this.props;

    return (
      <Container style={styles.container}>
				{
					this.state.loading && <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, flex: 1, width: '100%', backgroundColor: 'transparent', zIndex: 9999 }} />
				}
        <Content style={styles.content}>
          <View>
						<Field
							name="email"
							label="Email"
							autoCapitalize="none"
							icon="ios-mail-outline"
							keyboardType="email-address"
							onSubmitEditing={handleSubmit(this.handlePressSubmit)}
							validate={[required, email, aol]}
							component={Input}
						/>
						<Field
							name="password"
							label="Mật khẩu"
							secureTextEntry
							icon="ios-unlock-outline"
							returnKeyType="done"
							validate={[required, minLength6]}
							component={Input}
						/>
						{
							this.state.hasError && <Text style={{ fontSize: 10, color: '#d9534f', marginTop: 5, fontStyle: 'italic' }}>Tài khoản hoặc mật khẩu không đúng!</Text>
						}
						<BtnLoader
							block
							info
							style={styles.btn}
							onPress={handleSubmit(this.handlePressSubmit)}
							loading={this.state.loading || submitting}
							text="Đăng nhập"
						/>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
							<Button
								style={{ marginLeft: -16 }}
								transparent
							>
								<Text>Quên mật khẩu?</Text>
							</Button>
							<Button
								style={{ marginRight: -16 }}
								transparent
								onPress={this.testApi}
							>
								<Text>Đăng ký</Text>
							</Button>
						</View>
          </View>
					<View style={{ marginBottom: 50 }}>
						<Text style={{ marginBottom: 15, marginTop: 30, fontStyle: 'italic' }}>
							Hoặc đăng nhập bằng:
						</Text>
						<BtnFbLogin navigate={navigate} />
					</View>
        </Content>
      </Container>
    );
  }
}

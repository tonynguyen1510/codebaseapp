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

export default class LoginView extends Component {
  static propTypes = {
    // classes: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired,
    toggleMessageBox: PropTypes.func.isRequired
  }

  static defaultProps = {}

  handleMessage = () => {
    console.log('this is handle message');
    this.props.toggleMessageBox({message: 'test error', type: 'error'});
  }
  render() {
    const {navigate} = this.props;

    return (
      <Container style={styles.container}>
        <Content style={styles.content}>
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
							<Button
								style={{ marginLeft: -16 }}
								transparent
								onPress={() => navigate({routeName: 'Color'})}
							>
								<Text>Quên mật khẩu?</Text>
							</Button>
							<Button
								style={{ marginRight: -16 }}
								transparent
								onPress={() => this.handleMessage()}
							>
								<Text>Đăng ký</Text>
							</Button>
						</View>
          </View>
        </Content>
      </Container>
    );
  }
}

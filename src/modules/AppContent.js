/* --------------------------------------------------------
* Author Ngô An Ninh
* Email ninh.uit@gmail.com
* Phone 0978108807
*
* Created: 2018-04-17 13:05:58
*------------------------------------------------------- */
import React, { PureComponent } from 'react';
import NavigatorViewContainer from './navigator/NavigatorViewContainer';
import { View } from 'react-native';
import { Container } from 'native-base';
import LoginContainer from './auth/Login/LoginContainer';
import AuthStorage from '../utils/AuthStorage';
export default class AppContent extends PureComponent {
  static propTypes = {
    // classes: PropTypes.object.isRequired,
  }

  static defaultProps = {}
  state = {
		mode: 'mainscreen'
  }
  render() {
    return (
			<Container>
			{!AuthStorage.loggedIn &&
          <LoginContainer />
      }
			{AuthStorage.loggedIn && this.state.mode === 'mainscreen' &&
        <NavigatorViewContainer />
      }
     </Container>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
};

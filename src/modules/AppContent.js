/* --------------------------------------------------------
* Author Ngô An Ninh
* Email ninh.uit@gmail.com
* Phone 0978108807
*
* Created: 2018-04-17 13:05:58
*------------------------------------------------------- */
import React, { PureComponent } from 'react';
import NavigatorViewContainer from './navigator/NavigatorViewContainer';
import { Container } from 'native-base';
import LoginContainer from './auth/Login/LoginContainer';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleMessageBox } from '../redux/MessageBoxState';

function mapStateToProps(state) {
	return {
		auth: state.get('auth').toJS(),
		loader: state.get('loader').toJS()
	};
}

const mapDispatchToProps = {
	toggleMessageBox
};

@connect(mapStateToProps, mapDispatchToProps)
export default class AppContent extends PureComponent {
  static propTypes = {
		// classes: PropTypes.object.isRequired,
		auth: PropTypes.object.isRequired,
		toggleMessageBox: PropTypes.func.isRequired
  }

  static defaultProps = {}
  state = {
		mode: 'mainscreen'
	}
	componentWillReceiveProps(nextProps) {
		const { loader } = nextProps;
		if (loader.error) {
			// nextProps.toggleMessageBox({ message: loader.error, type: 'error' });
		}
	}

  render() {
		const { auth } = this.props;

    return (
			<Container>
				{!auth.userInfo.id &&
          <LoginContainer />
      }
				{auth.userInfo.id && this.state.mode === 'mainscreen' &&
        <NavigatorViewContainer />
      }
     </Container>
    );
  }
}

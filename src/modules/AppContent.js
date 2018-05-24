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
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AuthScreen from 'src/modules/auth';
import { toggleMessageBox } from '../redux/store/MessageBoxState';
// import { checkLogin } from 'src/redux/actions/auth';
import AuthStorage from 'src/utils/AuthStorage';

function mapStateToProps(state) {
	return {
		auth: state.get('auth').toJS(),
		loader: state.get('loader').toJS()
	};
}

const mapDispatchToProps = {
	toggleMessageBox,
	// checkLogin
};

@connect(mapStateToProps, mapDispatchToProps)
export default class AppContent extends PureComponent {
  static propTypes = {
		// classes: PropTypes.object.isRequired,
		auth: PropTypes.object.isRequired,
		toggleMessageBox: PropTypes.func.isRequired,
		// checkLogin: PropTypes.func.isRequired
	}

	static defaultProps = {}

	componentWillMount() {
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
			<Container style={{ flex: 1 }}>
				{(!auth.userInfo.id || !AuthStorage.token) &&
					<AuthScreen changeMode={this.changeMode}  />
				}
				{auth.userInfo.id &&
        	<NavigatorViewContainer />
      	}
     </Container>
    );
  }
}

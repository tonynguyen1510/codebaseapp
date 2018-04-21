import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginView from './LoginView';
import { NavigationActions } from 'react-navigation';
import * as AuthStateActions from '../../../redux/actions/auth';

export default connect(
  state => ({
		auth: state.get('auth').toJS()
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      authStateActions: bindActionCreators(AuthStateActions, dispatch),
    };
  }
)(LoginView);

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginView from './LoginView';
import { NavigationActions } from 'react-navigation';
import * as AuthStateActions from '../AuthState';
import {toggleMessageBox} from '../../messageBox/MessageBoxState';

export default connect(
  state => ({
		auth: state.get('auth').toJS()
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      authStateActions: bindActionCreators(AuthStateActions, dispatch),
      toggleMessageBox: (payload, next) => dispatch(toggleMessageBox(payload, next))
    };
  }
)(LoginView);

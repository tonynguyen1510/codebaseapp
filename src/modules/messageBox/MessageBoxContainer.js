import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MessageBoxView from './MessageBoxView';
import {NavigationActions} from 'react-navigation';
import * as MessageBoxStateActions from './MessageBoxState';

export default connect(
  state => ({
    messageBox: state.get('messageBox')
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      messageBoxActions: bindActionCreators(MessageBoxStateActions, dispatch)
    };
  }
)(MessageBoxView);
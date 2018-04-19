import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MessageBoxView from './MessageBoxView';
import {NavigationActions} from 'react-navigation';
import * as MessageBoxStateActions from '../../redux/MessageBoxState';

export default connect(
  state => ({
    messageBox: state.get('messageBox').toJS()
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      messageBoxActions: bindActionCreators(MessageBoxStateActions, dispatch)
    };
  }
)(MessageBoxView);

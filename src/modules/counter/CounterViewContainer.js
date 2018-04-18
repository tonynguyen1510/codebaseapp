import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CounterView from './CounterView';
import {NavigationActions} from 'react-navigation';
import * as CounterStateActions from '../counter/CounterState';
import { logoutRequest } from '../auth/AuthState';

export default connect(
  state => ({
    counter: state.getIn(['counter', 'value']),
    loading: state.getIn(['counter', 'loading'])
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
			counterStateActions: bindActionCreators(CounterStateActions, dispatch),
			logoutRequest: (next) => dispatch(logoutRequest(next))
    };
  }
)(CounterView);

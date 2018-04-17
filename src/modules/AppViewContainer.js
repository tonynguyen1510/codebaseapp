import {connect} from 'react-redux';
import AppView from './AppView';
console.ignoredYellowBox = ['Remote debugger'];

export default connect(
  state => ({
    isReady: state.getIn(['session', 'isReady'])
  })
)(AppView);

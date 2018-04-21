import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HomeView from './HomeView';
import { NavigationActions } from 'react-navigation';

export default connect(
	state => ({
	}),
	dispatch => {
		return {
			navigate: bindActionCreators(NavigationActions.navigate, dispatch),
		};
	}
)(HomeView);

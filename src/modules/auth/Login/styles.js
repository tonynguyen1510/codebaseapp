
import { StyleSheet, Dimensions } from 'react-native';

const deviceHeight = Dimensions.get('window').height;

export default {
	container: {
		backgroundColor: '#fff'
	},
	content: {
		padding: 20
	},
	logo: {
		marginTop: '20%',
		width: 120,
		height: 120,
		alignSelf: 'center',
	},
	btn: {
		marginTop: 20,
		marginBottom: 20
	},
};

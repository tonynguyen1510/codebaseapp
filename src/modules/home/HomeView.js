/* --------------------------------------------------------
* Author Ngô An Ninh
* Email ninh.uit@gmail.com
* Phone 0978108807
*
* Created: 2018-04-20 12:09:33
*------------------------------------------------------- */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/CustomHeader';
import {
	Container,
	Content,
	Button,
	Text,
} from 'native-base';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Home extends Component {

	static displayName = 'HomeView';

  static navigationOptions = {
		title: 'Home',
		header: (
			<Header />
		),
    tabBarIcon: (props) => (
        <Icon name='plus-one' size={24} color={props.tintColor} />
      )
  }
	static propTypes = {
		// prop: PropTypes.object.isRequired,
		navigate: PropTypes.func.isRequired
	}

	static defaultProps = {}

	render() {
		const {  } = this.props;

		return (
			<Container style={styles.container}>
				<Text>Hello</Text>
			</Container>
		);
	}
}

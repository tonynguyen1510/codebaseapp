/*--------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 *
 * Created: 2017-07-30 10:55:08
 *-------------------------------------------------------*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import {
	Container,
	Content,
	Button,
	Text,
	Icon,
} from 'native-base';
import Modal from 'react-native-modalbox';

export default class MessageBox extends Component {
	static propTypes = {
	  messageBox: PropTypes.object.isRequired,
    messageBoxActions: PropTypes.shape({
      toggleMessageBox: PropTypes.func.isRequired
    }).isRequired,
    navigate: PropTypes.func.isRequired
	}

	state = {
		isOpen: false,
	}

	handleClose = () => {
		this.props.messageBoxActions.toggleMessageBox();
	}

	render() {
    const { messageBox } = this.props;

		return (
			<Modal
				style={{
					height: 300,
					width: '90%',
					paddingTop: 15,
					paddingBottom: 15,
					paddingLeft: 15,
					paddingRight: 15,
				}}
				position="center"
				swipeToClose={false}
				backButtonClose
				coverScreen
				isOpen={messageBox.isOpen}
				onClosed={this.handleClose}
			>
				{
					messageBox.type === 'error' ?
						<Text style={{ fontSize: 24, marginBottom: 15, textAlign: 'left', color: '#d9534f' }}>Lỗi: </Text> :
						<Text style={{ fontSize: 24, marginBottom: 15, textAlign: 'left' }}>Thông báo: </Text>
				}
				<Content style={{ width: '100%', borderTopColor: '#b9c1ca', borderTopWidth: 0.5, paddingTop: 15 }}>
					<Text>{messageBox.message}</Text>
				</Content>
			</Modal>
		);
	}
}

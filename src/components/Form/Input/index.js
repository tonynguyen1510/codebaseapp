/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2017-12-17 11:24:46
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import {
	Animated,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View,
	StyleSheet,
} from 'react-native';

import { Icon } from 'native-base';

import BaseInput from './BaseInput';

const PADDING = 2;

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		borderBottomWidth: 0.5,
		borderBottomColor: '#636262',
		height: 48 + PADDING,
	},
	labelContainer: {
		position: 'absolute',
	},
	label: {
		fontSize: 16,
		color: '#6a7989',
	},
	textInput: {
		position: 'absolute',
		top: 6,
		left: 25,
		padding: 0,
		color: '#000',
		fontSize: 16,
		height: 48,
	},
	border: {
		position: 'absolute',
		bottom: 0,
		left: '50%',
		right: 0,
		height: 1,
	},
});

export default class Input extends BaseInput {
	static propTypes = {
		label: PropTypes.string,
		icon: PropTypes.string,
		error: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.bool,
		]),
		success: PropTypes.bool,
	};

	static defaultProps = {
	};

	render() {
		const { label, error, success, icon, ...restOfProps } = this.props;
		const { width, focusedAnim, focusedAnimLabel, value } = this.state;

		return (
			<View style={{ marginBottom: 15 }}>
				<View
					style={[
						styles.container,
						{
							width,
							borderBottomColor: error ? '#d9534f' : '#b9c1ca',
						},
					]}
					onLayout={this._onLayout}
				>
					<Icon active name={icon} style={{ color: error ? '#d9534f' : '#575757', fontSize: 20, top: 20 }} />
					<TextInput
						ref="input"
						{...restOfProps}
						style={[
							styles.textInput,
							{
								width,
							},
						]}
						value={value}
						onBlur={this._onBlur}
						onChange={this._onChange}
						onFocus={this._onFocus}
						underlineColorAndroid="transparent"
					/>
					{
						success && <Icon active name="ios-checkmark" style={{ color: '#5cb85c', fontSize: 24, top: 20, right: 0, position: 'absolute' }} />
					}
					<TouchableWithoutFeedback onPress={this.focus}>
						<Animated.View
							style={[
								styles.labelContainer,
								{
									opacity: focusedAnimLabel.interpolate({
										inputRange: [0, 0.5, 1],
										outputRange: [1, 0, 1],
									}),
									top: focusedAnimLabel.interpolate({
										inputRange: [0, 0.5, 0.51, 1],
										outputRange: [21, 21, 0, 0],
									}),
									left: focusedAnimLabel.interpolate({
										inputRange: [0, 0.5, 0.51, 1],
										outputRange: [25, 25, 0, 0],
									}),
								},
							]}
						>
							<Animated.Text
								style={[
									styles.label,
									{
										fontSize: focusedAnimLabel.interpolate({
											inputRange: [0, 1],
											outputRange: [14, 10],
										}),
										top: 0,
										color: error ? '#d9534f' : '#575757',
									}
								]}
							>
								{label}
							</Animated.Text>
						</Animated.View>
					</TouchableWithoutFeedback>
					<Animated.View
						style={[
							styles.border,
							{
								width: focusedAnim.interpolate({
									inputRange: [0, 1],
									outputRange: [0, width],
								}),
								left: focusedAnim.interpolate({
									inputRange: [0, 1],
									outputRange: ['50%', '0%'],
								}),
								backgroundColor: error ? '#d9534f' : '#636262',
							},
						]}
					/>
				</View>
				{
					error && <Text style={{ fontSize: 10, color: '#d9534f', marginTop: 5, fontStyle: 'italic' }}>{error}</Text>
				}
			</View >
		);
	}
}

import { Platform, AsyncStorage } from 'react-native'
import { Dimensions } from 'react-native'

const wDimension = Dimensions.get('window')

const W_WIDTH = 1080 // Redmi note 3
const W_HEIGHT = 1920

const adjustWidth = (width) => {
	return Math.ceil(width * wDimension.width / W_WIDTH)
}
const adjustHeight = (height) => {
	return Math.ceil(height * wDimension.height / W_HEIGHT)
}

const adjustSize = (size) => {
	const base = wDimension.width < wDimension.height ?
    wDimension.width : wDimension.height
	let result = size * base / W_WIDTH;
	if (Platform.OS !== 'ios') result = result * 0.85;
	return Math.ceil(result)
}

const uuid = () => {
	return (
		'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		})
	)
}

async function setupDeviceId() {
	// return AsyncStorage.removeItem('DEVICE_ID');
	let deviceId;
	try {
		deviceId = await AsyncStorage.getItem('DEVICE_ID')
	} catch (err) {
		deviceId = '';
	}
	if (!deviceId) {
		deviceId = uuid();
		try {
			await AsyncStorage.setItem('DEVICE_ID', deviceId);
		} catch (error) {
			// Error saving data
		}
	}
	global.DEVICE_ID = deviceId;
}

module.exports = {
	adjustHeight,
	adjustWidth,
	adjustSize,
	setupDeviceId,
}

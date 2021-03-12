import { StyleSheet, Dimensions } from 'react-native';

const ScreenWidth: number = Dimensions.get('screen').width;

export const goodCardSize: number = ScreenWidth / 2 - 20;

const cardHeight: number = goodCardSize > 150 ? 100 : 120;

export default StyleSheet.create({
	container: {
		width: goodCardSize,
		height: goodCardSize + cardHeight,
		borderRadius: 4,
		backgroundColor: '#fafafa',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

// @flow
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
	View, Animated, TextInput, Text, Dimensions,
} from 'react-native';
import { goodsData } from '../../commons/data';
import { GoodCard } from '../../components';

import Styles from './styles';

function elevationStyle(value, color) {
	return {
		shadowOpacity: Animated.add(Animated.multiply(value, 0.0015), 0.18),
		shadowRadius: Animated.multiply(value, 0.54),
		shadowColor: color || '#000',
		shadowOffset: {
			width: 0,
			height: Animated.multiply(value, 0.6),
		},
		elevation: value,
	};
}

class GoodsScreen extends Component {
	scrollY: Animated.Value = new Animated.Value(0);

	state = {
		listData: [],
		layout: Dimensions.get('window'),
	}

	componentDidMount() {
		this.mounted = true;
		this.setState({ listData: goodsData });
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	onScroll = Animated.event(
		[
			{
				nativeEvent: {
					contentOffset: {
						y: this.scrollY,
					},
				},
			},
		],
		{ useNativeDriver: false },
	);

	buildAnimatedValues = (bkgBlockHeight: number): any[] => {
		const path = bkgBlockHeight - 0;
		// Opacity
		const opacity = this.scrollY.interpolate({
			inputRange: [0, path, path + 1],
			outputRange: [0.001, 1, 1],
		});
		return [
			// opacity
			opacity,
			// panel content offset Y
			opacity.interpolate({
				inputRange: [0, 1],
				outputRange: ['rgb(33, 125, 164)', 'rgb(109, 162, 225)'], // 10 - additional offset top
			}),
			// scale
			opacity.interpolate({
				inputRange: [0, 0.6, 1],
				outputRange: [1, 0.3, 0],
			}),
			// shadow
			opacity.interpolate({
				inputRange: [0, 0.5, 1],
				outputRange: [3, 2, 0],
			}),
		];
	};

	renderHeader=() => {
		const { width } = this.state.layout;
		const avs = this.buildAnimatedValues(Math.ceil(width / 0.98));
		return (
			<Animated.View style={[Styles.headerContainer, {
				...elevationStyle(avs[3]),
			}, { backgroundColor: avs[1] }]}
			>
				<View>
					<TextInput style={Styles.searchBar} placeholder="Введите наименование товара..." />
				</View>
				<Animated.View style={[Styles.sectionContainer, { marginTop: 8 },
					{ transform: [{ scale: avs[2] }] }]}
				>
					<View style={Styles.pills}>
						<Text style={{ color: '#fff' }}>Кросовки</Text>
					</View>
					<View style={Styles.pills}>
						<Text style={{ color: '#fff' }}>Кеды</Text>
					</View>
					<View style={Styles.pills}>
						<Text style={{ color: '#fff' }}>Ботинки</Text>
					</View>
					<View style={Styles.pills}>
						<Text style={{ color: '#fff' }}>Бег</Text>
					</View>
				</Animated.View>
			</Animated.View>
		);
	}

	renderListItem = ({ item }: any) => <GoodCard containerStyle={{ marginVertical: 10, marginHorizontal: 5 }} data={item} />

	render() {
		const { listData } = this.state;
		return (
			<View style={Styles.container}>
				{this.renderHeader()}
				<Animated.FlatList
					numColumns={2}
					contentContainerStyle={Styles.listContentContainer}
					data={listData}
					renderItem={this.renderListItem}
					keyExtractor={(item) => `key${item.id}`}
					onScroll={this.onScroll}
				/>
			</View>
		);
	}
}

export default GoodsScreen;

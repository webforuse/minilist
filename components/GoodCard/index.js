// @flow
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Styles from './styles';

class GoodCard extends Component {
	componentDidMount() {
		this.mounted = true;
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	render() {
		const { data, containerStyle } = this.props;
		return (
			<View style={containerStyle && containerStyle}>
				<View style={Styles.container}>
					<Text>{data.title || ''}</Text>
				</View>
			</View>
		);
	}
}

export default GoodCard;

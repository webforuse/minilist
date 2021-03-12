/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	Text,
	StatusBar,
} from 'react-native';

import GoodsScreen from './screens/main';

const App: () => React$Node = () => (
	<>
		<GoodsScreen />
	</>
);

export default App;

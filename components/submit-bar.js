import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import colors from '../product/colors';

export default class SubmitBar extends PureComponent {
	render() {
		return (
			<View style={styles.container}>
				<Button raised primary style={styles.button}>
					Preferred
				</Button>
				<Button raised style={styles.button}>
					Submit
				</Button>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		// position: 'absolute',
		// bottom: 100,
		// zIndex: 10
	},
	button: {
		flex: 1
	},
})
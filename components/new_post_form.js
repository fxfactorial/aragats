import React, { PureComponent } from 'react';
import {
	Text, View,
	ScrollView, StyleSheet,
	TouchableOpacity, Image
} from 'react-native';
import Swiper from 'react-native-swiper';
import { ImagePicker } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import colors from '../product/colors';

const dummyTags = [ 'electronics', 'pc', 'mobile' ];

export default class NewPostForm extends PureComponent {
	state = {
		tags: dummyTags.map(tag => ({ tagName: tag, selected: false })),
		images: new Array(3).fill(undefined)
	}
	onTagPress = (tagName) => {
		const tags = this.state.tags
			.map(el => el.tagName === tagName ? ({ tagName, selected: !el.selected }) : el);
		this.setState({ tags });
	}
	addImage = async () => {
		const newImage = await ImagePicker.launchImageLibraryAsync();
		if (!newImage.cancelled) {
			this.setState({})
		}
	}
	render() {
		return (
			<ScrollView>
				<TextInput
					label='Product name'
					style={styles.input}
				/>
				<View style={styles.tags}>
					{
						this.state.tags.map(tag => (
							<TouchableOpacity
								onPress={() => this.onTagPress(tag.tagName)}
								style={tag.selected ? [styles.chip, styles.selected] : styles.chip}
								key={tag.tagName}
							>
								<Text>
									{tag.tagName}
								</Text>
							</TouchableOpacity>
						))
					}
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	tags: {
		flexDirection: 'row'
	},
	chip: {
		borderRadius: 10,
		backgroundColor: '#D3D3D3',
		padding: 10
	},
	selected: {
		backgroundColor: colors.primary_color
	}
})
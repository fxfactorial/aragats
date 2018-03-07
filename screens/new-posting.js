import React, { PureComponent } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import SubmitBar from '../components/submit-bar';
import NewPostForm from '../components/new_post_form';

export default class NewPosting extends PureComponent {
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <NewPostForm />
          <SubmitBar />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

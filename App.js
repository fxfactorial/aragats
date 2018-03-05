import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Notifications } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';
import RootNavigation from './navigation/root-navigation';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import registerForPushNotificationsAsync from './api/registerForPushNotificationsAsync';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

export default class AragatsApplication extends React.Component {
  state = { application_loaded: false };

  render() {
    if (!this.state.application_loaded && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <PaperProvider theme={theme}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
            <RootNavigation />
          </View>
        </PaperProvider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    await Font.loadAsync({ ...MaterialIcons.font });
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();
    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  };

  _handleNotification = ({ origin, data }) => {
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState(() => ({ application_loaded: true }));
  };
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  statusBarUnderlay: { height: 24, backgroundColor: 'rgba(0,0,0,0.2)' },
});

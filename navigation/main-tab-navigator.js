import React from 'react';
import { Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import ToolBar from '../components/toolbar';
import colors from '../product/colors';
import all_offerings from '../screens/all-offerings';
import new_posting from '../screens/new-posting';
import profile from '../screens/profile';

export default TabNavigator(
  {
    all_offerings: { screen: all_offerings },
    new_posting: { screen: new_posting },
    profile: { screen: profile },
  },
  {
    navigationOptions: ({ navigation }) => ({
      header: () => <ToolBar navigation={navigation} />,
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'all_offerings':
            iconName = 'business';
            break;
          case 'new_posting':
            iconName = 'add-circle-outline';
            break;
          case 'profile':
            iconName = 'settings';
            break;
        }
        return (
          <MaterialIcons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? colors.tabIconSelected : colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);

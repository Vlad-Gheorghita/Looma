import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '@navigationTypes';
import { HomeScreen } from '@screens';

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
  </Tab.Navigator>
);

export default TabNavigator;

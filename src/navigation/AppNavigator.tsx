import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';

const AppNavigator = ({ isLoggedIn }: { isLoggedIn: boolean }) => (
  <NavigationContainer>
    {isLoggedIn ? <TabNavigator /> : <AuthNavigator />}
  </NavigationContainer>
);

export default AppNavigator;

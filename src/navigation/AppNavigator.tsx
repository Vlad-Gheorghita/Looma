import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import { navigationRef } from 'services/navigation/navigationService';
import { AppStackParamList } from '@navigationTypes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = ({ isLoggedIn }: { isLoggedIn: boolean }) => (
  <NavigationContainer ref={navigationRef}>
    {isLoggedIn ? (
      <Stack.Navigator>
        <Stack.Screen name="Tab" component={TabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    ) : (
      <Stack.Navigator>
        <Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    )}
  </NavigationContainer>
);

export default AppNavigator;

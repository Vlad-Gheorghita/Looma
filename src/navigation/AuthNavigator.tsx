import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthStackParamList } from "@navigationTypes";
import { LoginScreen, RegisterScreen, StartScreen } from "@screens";

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator = () => (
  <Stack.Navigator initialRouteName="Start">
    <Stack.Screen
      name="Start"
      component={StartScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default AuthNavigator;

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "@screens/authentication/LoginScreen";
import RegisterScreen from "@screens/authentication/RegisterScreen";
import StartScreen from "@screens/authentication/StartScreen";

const Stack = createStackNavigator();

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

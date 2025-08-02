import React from "react";
import { AuthStackParamList } from "@navigationTypes";
import { LoginScreen, RegisterScreen, StartScreen } from "@screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => (
  <Stack.Navigator 
    initialRouteName="Start"
    screenOptions={{
      headerStyle: {
        backgroundColor: '#af1010',
      },
      headerTintColor: '#000000',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#000000',
      },
    }}
  >
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

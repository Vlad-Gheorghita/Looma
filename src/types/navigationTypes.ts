import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Start: undefined;
  Login: undefined;
  Register: undefined;
};

export type TabStackParamList = {
  Home: undefined;
};

export type AppStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Tab: NavigatorScreenParams<TabStackParamList>;
};

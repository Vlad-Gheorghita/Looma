import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "@navigationTypes";
import { BillSplitScreen, SettingsScreen } from "@screens";
import BillIcon from "@icons/bill-icon.svg";
import SettingsIcon from "@icons/settings-icon.svg";

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#ffffff',
      },
      headerTintColor: '#000000',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#000000',
      },
    }}
  >
    <Tab.Screen
      name="BillSplit"
      component={BillSplitScreen}
      options={{
        title: "Bill Split",
        headerTitleAlign: "center",
        tabBarIcon: ({ color, size }) => (
          <BillIcon width={size} height={size} fill={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        title: "Settings",
        tabBarIcon: ({ color, size }) => (
          <SettingsIcon width={size} height={size} fill={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default TabNavigator;

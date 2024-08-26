import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; 
import HomeScreen from '../screens/Users';
import SettingsScreen from '../screens/SettingsScreen';
import HelpScreen from '../screens/HelpScreen';

import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'Help') {
            iconName = focused ? 'help-circle' : 'help-circle-outline';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Settings" options={{ headerShown: false }} component={SettingsScreen} />
      <Tab.Screen name="Help" options={{ headerShown: false }} component={HelpScreen} />
    </Tab.Navigator>
  );
}


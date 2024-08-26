import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserListScreen from './UserListScreen';
import Profile from './Profile';
import SettingsScreen from './SettingsScreen';
import Icon from 'react-native-vector-icons/Ionicons'; 
import HelpScreen from './HelpScreen';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
const Tab = createBottomTabNavigator();

export default function BottomTabNavigator({ route }) {
  const { token, updatedName, updatedEmail } = route.params || {};


  return (
    <Tab.Navigator screenOptions={({ route }) => ({
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
      })}>
      <Tab.Screen name="Home" options={{ headerShown: false }}>
        {(props) => <UserListScreen {...props} token={token} />}
      </Tab.Screen>
      <Tab.Screen name="Profile" options={{ headerShown: false }} component={Profile} initialParams={{ token, updatedName, updatedEmail }} />
      <Tab.Screen name="Settings" options={{ headerShown: false }} component={SettingsScreen} />
      <Tab.Screen name="Help" options={{ headerShown: false }} component={HelpScreen} />
    </Tab.Navigator>
  );
}

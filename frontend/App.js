import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SendOtpScreen from './screens/SendOtpScreen';
import VerifyOtpScreen from './screens/VerifyOtpScreen';
import UpdateProfileScreen from './screens/UpdateProfileScreen';
import UserListScreen from './screens/UserListScreen';
import ChatScreen from './screens/ChatScreen';
import BottomTabNavigator from './screens/BottomTabScreen';
import SplashScreen from './screens/SplashScreen';

const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splashscreen">
      <Stack.Screen options={{ headerShown: false }} name="Main" component={BottomTabNavigator} />
        <Stack.Screen name="Splashscreen" options={{ headerShown: false }} component={SplashScreen} />
        <Stack.Screen name="SendOtp" options={{ headerShown: false }} component={SendOtpScreen} />
        <Stack.Screen name="VerifyOtp" options={{ headerShown: false }} component={VerifyOtpScreen} />
        <Stack.Screen name="UpdateProfile" options={{ headerShown: false }} component={UpdateProfileScreen} />
        <Stack.Screen options={{ headerShown: false }} name="UserList" component={UserListScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

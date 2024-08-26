import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function VerifyOtpScreen({ route, navigation }) {
  const { phoneNumber } = route.params;
  const [otp, setOtp] = useState('');

  const verifyOtp = async () => {
    try {
      const response = await axios.post('http://192.168.0.84:3001/verify-otp', { phoneNumber, otp });
      
      // Log the response data to inspect the structure
      console.log('Response data:', response.data);

      const { token } = response.data;

      if (token) {
        // Store the token in AsyncStorage
        await AsyncStorage.setItem('token', token);

        // Navigate to the Home screen
        navigation.navigate('UpdateProfile',{ token });
      } else {
        Alert.alert('Error', 'Token not found in the response');
      }
    } catch (error) {
      // Log the error response for debugging
      console.error('Error response:', error.response ? error.response.data : error.message);
      
      Alert.alert('Error', error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/login_bgm.png')}
      style={styles.background}
    >
      <Text style={styles.headerText}>VERIFY OTP</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.loginText}>OTP Verification</Text>
        <Text style={styles.content}>Enter the OTP sent to {phoneNumber}</Text>
        <TextInput
          value={otp}
          style={styles.input}
          onChangeText={setOtp}
          keyboardType="number-pad"
          placeholder="Enter OTP"
          placeholderTextColor="#888"
        />
      </View>
      <View style={styles.BottomContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={verifyOtp}
        >
          <Text style={styles.buttonText}>VERIFY</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
  },
  headerText: {
    position: 'absolute',
    top: 30,
    left: 20,
    fontSize: 30,
    fontWeight: '700',
    color: "#1B408C",
    fontFamily: 'Roboto',
  },
  inputContainer: {
    width: '100%',
    top: 80,
    alignItems: 'center',
  },
  input: {
    width: '90%',
    fontSize: 14,
    height: 45,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  loginText: {
    fontSize: 30,
    fontFamily: 'Roboto',
    paddingBottom: 30,
    color: '#FFFFFF',
  },
  content: {
    fontSize: 11,
    fontFamily: 'Roboto',
    alignItems: 'center',
    paddingBottom: 20,
    color: '#FFFFFF',
  },
  button: {
    width: '90%',
    backgroundColor: '#ffff',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  BottomContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
    position: 'absolute',
    bottom: 0,
  },
});

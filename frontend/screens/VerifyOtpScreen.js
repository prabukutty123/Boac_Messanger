import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Alert, AsyncStorage } from 'react-native';
import axios from 'axios';

export default function VerifyOtpScreen({ route, navigation }) {
  const { phoneNumber } = route.params;
  const [otp, setOtp] = useState('');

  const verifyOtp = async () => {
    try {
      const response = await axios.post('http://192.168.0.202:3001/verify-otp', { phoneNumber, otp });
      const { token } = response.data;

      if (token) {
        // Save the token in AsyncStorage or your preferred storage
        await AsyncStorage.setItem('userToken', token);

        // Navigate to UpdateProfile screen
        navigation.navigate('UpdateProfile');
      } else {
        Alert.alert('OTP Verification failed', 'Please try again.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('OTP Verification failed', 'Please try again.');
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

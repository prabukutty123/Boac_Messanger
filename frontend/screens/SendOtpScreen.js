import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Image,Alert } from 'react-native';
import axios from 'axios';

export default function SendOtpScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState('');

  const sendOtp = async () => {
    try {
      await axios.post('http://13.126.51.141:3009/send-otp', { phoneNumber });
      Alert.alert('OTP sent successfully');
      navigation.navigate('VerifyOtp', { phoneNumber });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ImageBackground
      source={require('../assets/login_bgm.png')}
      style={styles.background}
    >
      <Text style={styles.headerText}>LOGIN</Text>
      <Image
        style={styles.image}
        source={require('../assets/splash.png')}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.loginText}>Welcome</Text>
        <Text style={styles.content}>Please enter your phone number to verify OTP</Text>
        <View style={styles.phoneInputContainer}>
          <Image
            source={require('../assets/indiaflag.png')}
            style={styles.flagIcon}
          />
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            value={phoneNumber}
            style={styles.input}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            placeholder="Enter phone number"
            placeholderTextColor="#888"
          />
        </View>
      </View>
      <View style={styles.BottomContainer}>
        <Text style={styles.bottomContent}>
          By proceeding, you are agreeing to BOACPAY’s <Text style={styles.highlight}>Terms and Conditions </Text>&<Text style={styles.highlight}>Privacy Policy</Text>
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={sendOtp}
        >
          <Text style={styles.buttonText}>CONTINUE</Text>
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
  image: {
    position: 'absolute',
    top: 50,
    right: 18,
    width: 100,
    height: 80,
  },
  inputContainer: {
    width: '100%',
    top: 80,
    alignItems: 'center',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  flagIcon: {
    width: 30,
    height: 20,
    marginRight: 5,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    height: 45,
    alignItems: 'center',
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
    bottom:0,
    width: '120%',
    backgroundColor: '#ffff',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    color: 'black',
    fontWeight:'bold',
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
  bottomContent: {
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 11,
    color: '#ffff',
    paddingBottom: 10,
  },
  highlight: {
    color:'orange'
  },
});


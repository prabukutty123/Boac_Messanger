// screens/UpdateProfileScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,ImageBackground,Image } from 'react-native';
import axios from 'axios';

export default function UpdateProfileScreen({ route, navigation }) {
  const { token } = route.params;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const updateProfile = async () => {
    try {
      await axios.post('http://192.168.0.84:3009/update-profile', { name, email }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigation.navigate('Main', { token,updatedName: name, updatedEmail: email });
    } catch (error) {
      console.error(error);
    }
  };

  return (
<ImageBackground
      source={require('../assets/login_bgm.png')}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffff',
      }}
    >
      <Text style={styles.headerText}>PROFILE</Text>
      <Image
        height={"159px"} width={"200px"} style={styles.image} source={require('../assets/splash.png')}
      />
      <Text style={styles.label}>Enter your name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Your Name"
      />
      <Text style={styles.label}>Enter your email:</Text>
      <TextInput
        style={[styles.input, styles.emailInput]}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder="Your Email"
      />
 <View style={styles.BottomContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={updateProfile}
      >
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginBottom: 10,
  alignItems:'flex-start',
  textAlign:'left',
  paddingLeft:20,
  color:'#fff'
  },
  image: {
    position: 'absolute',
    top: 50,
    right: 18,
    width: 100,
    height: 80,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor:'#fff'
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
  BottomContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
    position: 'absolute',
    bottom: 0,
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
});

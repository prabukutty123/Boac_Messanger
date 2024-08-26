import React, { useState } from 'react';
import { View, TextInput, Image, Text, Button, StyleSheet, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setLoading] = useState(false);

  const registerUser = () => {
    const userId = uuid.v4();
    setLoading(true);
    firestore().collection("users").doc(userId).set({
      name: name,
      email: email,
      password: password,
      mobile: mobile,
      userId: userId
    }).then(res => {
      console.log('User created');
      navigation.navigate('Login');
    }).catch(error => {
      console.log(error);
    }).finally(() => {
      setLoading(false);
    });
  };

  const validate = () => {
    let isValid = true;
    let errorMessage = '';

    if (!name) {
      isValid = false;
      errorMessage = 'Name is required';
    } else if (!email) {
      isValid = false;
      errorMessage = 'Email is required';
    } else if (!mobile) {
      isValid = false;
      errorMessage = 'Mobile number is required';
    } else if (!password) {
      isValid = false;
      errorMessage = 'Password is required';
    } else if (password.length < 8) {
      isValid = false;
      errorMessage = 'Password must be at least 8 characters';
    } else if (!/[A-Z]/.test(password)) {
      isValid = false;
      errorMessage = 'Password must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(password)) {
      isValid = false;
      errorMessage = 'Password must contain at least one lowercase letter';
    } else if (!/[0-9]/.test(password)) {
      isValid = false;
      errorMessage = 'Password must contain at least one number';
    } else if (password !== confirmPassword) {
      isValid = false;
      errorMessage = 'Passwords do not match';
    }

    if (!isValid) {
      Alert.alert('Validation Error', errorMessage);
    }

    return isValid;
  };

  const LoginPage = () => {
    navigation.navigate('Login');
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
      <Text style={styles.headerText}>SIGN UP</Text>
      <Image
        height={"159px"} width={"200px"} style={styles.image} source={require('../assets/splash.png')}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={text => setName(text)}
          style={styles.input}
          maxLength={50}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Mobile Number"
          value={mobile}
          onChangeText={text => setMobile(text)}
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity onPress={LoginPage}>
          <Button
            onPress={() => {
              if (!isLoading && validate()) {
                registerUser();
              }
            }}
            title={isLoading ? "Signing Up..." : "Sign Up"}
            disabled={isLoading}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={LoginPage}>
          <Text style={{ color: "#ffff" }}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  headerText: {
    position: 'absolute',
    top: 10,
    left: 20,
    fontSize: 30,
    fontWeight: '700',
    paddingTop: 30,
    color: "#1B408C",
    fontFamily: 'Roboto',
  },
  inputContainer: {
    width: '100%',
    top: 80,
    alignItems: 'center'
  },
  input: {
    width: '90%',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#ffff',
  },
  image: {
    position: 'absolute',
    top: 30,
    right: 18,
    width: 100,
    height: 80,
  },
});

export default SignUpScreen;

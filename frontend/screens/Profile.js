// screens/ProfileScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export default function Profile({ route }) {
  const navigation = useNavigation();
  const { token, updatedName, updatedEmail, profileImage } = route.params || {};
  const [name, setName] = useState(updatedName || '');
  const [email, setEmail] = useState(updatedEmail || '');
  const [image, setImage] = useState(profileImage || ''); // Default image URL can be added here

  useEffect(() => {
    if (route.params) {
      setName(updatedName);
      setEmail(updatedEmail);
      setImage(profileImage);
    }
  }, [route.params]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" type="font-awesome" size={24} color="black" style={styles.backIcon} />
        </TouchableOpacity>
      ),
      title: 'Profile',
    });
  }, [navigation]);

  const handleProfileImagePress = () => {
    // Handle the profile image press to open camera or gallery
    console.log('Profile image pressed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/splash.png')} style={styles.profileImage} />
        <TouchableOpacity style={styles.cameraIconContainer} onPress={handleProfileImagePress}>
          <Icon name="camera" type="font-awesome" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Icon name="user" type="font-awesome" size={24} color="black" style={styles.icon} />
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="envelope" type="font-awesome" size={24} color="black" style={styles.icon} />
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{email}</Text>
        </View>
        <View style={[styles.infoRow, styles.infoRowWrap]}>
          <Icon name="info-circle" type="font-awesome" size={24} color="black" style={styles.icon} />
          <Text style={styles.label}>About:</Text>
          <Text style={[styles.value, styles.valueWrap]}>Success Depends Upon Your Hard Work</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="phone" type="font-awesome" size={24} color="black" style={styles.icon} />
          <Text style={styles.label}>Phone Number:</Text>
          <Text style={styles.value}>My Number</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    position: 'relative',
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderRadius: 20,
  },
  infoContainer: {
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 5, // Added padding to increase space between rows
  },
  infoRowWrap: {
    flexWrap: 'wrap',
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginRight: 10, // Added margin to increase space between label and value
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  valueWrap: {
    flex: 1, // Ensure the text wraps within the available space
  },
  backIcon: {
    marginLeft: 15,
  },
});

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, StatusBar, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { RNCamera } from 'react-native-camera';

export default function UserListScreen({ token, navigation }) {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://192.168.0.87:3001/user-list', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching user list:', error);
      }
    };

    fetchUsers();
  }, [token]);

  const navigateToChat = (user) => {
    navigation.navigate('Chat', { user, token });
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const Logout = async () => {
    await AsyncStorage.clear();
    navigation.replace('Login');
  };

  const handleCamera = async (camera) => {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);
      console.log(data.uri);
      setCameraVisible(false);
    }
  };

  // if (cameraVisible) {
  //   return (
  //     <RNCamera
  //       style={styles.preview}
  //       type={RNCamera.Constants.Type.back}
  //       captureAudio={false}
  //       flashMode={RNCamera.Constants.FlashMode.on}
  //       androidCameraPermissionOptions={{
  //         title: 'Permission to use camera',
  //         message: 'We need your permission to use your camera',
  //         buttonPositive: 'Ok',
  //         buttonNegative: 'Cancel',
  //       }}
  //       onCameraReady={() => {
  //         console.log('Camera is ready');
  //       }}
  //     >
  //       {({ camera }) => (
  //         <View style={styles.captureContainer}>
  //           <TouchableOpacity onPress={() => handleCamera(camera)} style={styles.captureButton}>
  //             <Text style={styles.captureText}>Capture</Text>
  //           </TouchableOpacity>
  //         </View>
  //       )}
  //     </RNCamera>
  //   );
  // }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1B408C" barStyle="light-content" />
      <View style={styles.header}>
        <Image source={require('../assets/splash.png')} style={styles.profileImage} />
        <Text style={styles.title}>BOAC</Text>
        <View style={styles.headerIcons}>
          <Icon name="qr-code-outline" size={28} color="#FFFF" style={styles.icon} />
          <TouchableOpacity  style={styles.cameraIcon}>
            <Icon name="camera-outline" size={28} color="#FFFF" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)} style={styles.menuIcon}>
            <Icon name="ellipsis-vertical" size={28} color="#FFFF" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      {menuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.menuItem}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={Logout}>
            <Text style={styles.menuItem}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search User..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#888"
        />
      </View>
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToChat(item)} style={styles.contactItem}>
            <Image source={require('../assets/splash.png')} style={styles.contactImage} />
            <View style={styles.contactDetails}>
              <Text style={styles.username}>{item.name}</Text>
              <Text>Email: {item.email}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: '#FFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1B408C',
    marginBottom: 15,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  headerIcons: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  icon: {
    marginLeft: 20,
  },
  cameraIcon: {
    zIndex: 10,
  },
  menuIcon: {
    zIndex: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 15,
  },
  searchInput: {
    flex: 1,
    height: 35,
    paddingLeft: 40,
    paddingVertical: 0,
  },
  contactDetails: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 20,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastMessage: {
    color: '#888',
    marginTop: 5,
  },
  contactImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#1B408C',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%',
  },
  menu: {
    position: 'absolute',
    right: 15,
    top: 60,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    zIndex: 20,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  captureContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  captureButton: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  captureText: {
    fontSize: 14,
  },
});

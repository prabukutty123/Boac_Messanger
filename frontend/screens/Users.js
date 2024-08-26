import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, StatusBar, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

let id = '';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    id = await AsyncStorage.getItem('USERID');
    let tempData = [];
    const email = await AsyncStorage.getItem('EMAIL');
    firestore()
      .collection('users')
      .where('email', '!=', email)
      .get()
      .then(res => {
        if (res.docs.length > 0) {
          res.docs.forEach(item => {
            tempData.push(item.data());
          });
        }
        setUsers(tempData);
      });
  };

  const Logout = async () => {
    await AsyncStorage.clear();
    navigation.replace('Login');
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1B408C" barStyle="light-content" />
      <View style={styles.header}>
        <Image source={require('../assets/splash.png')} style={styles.profileImage} />
        <Text style={styles.title}>BOAC</Text>
        <View style={styles.headerIcons}>
          <Icon name="qr-code-outline" size={28} color="#FFFF" style={styles.icon} />
          <Icon name="camera-outline" size={28} color="#FFFF" style={styles.icon} />
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
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {
            navigation.navigate('Chats', { data: item, id: id });
          }}>
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.email} 
      />
    </View>
  );
};

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
    padding: 5,
  },
  headerIcons: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  icon: {
    marginLeft: 20,
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
    padding: 15,
  },
  username: {
    fontSize: 18,
  },
  lastMessage: {
    color: '#888',
    marginTop: 5,
  },
  contactImage: {
    height: 40,
    width: 40,
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
  name: {
    padding: 15,
    fontSize: 16,
  },
});

export default Users;

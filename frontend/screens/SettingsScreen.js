import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView,Alert } from 'react-native';
import { Switch, Icon } from 'react-native-elements';

const SettingsScreen = ({ navigation }) => {
  const [isPushEnabled, setIsPushEnabled] = useState(false);

  const toggleSwitch = () => setIsPushEnabled(previousState => !previousState);

  const handleLogout = () => {
    // Add your logout logic here
    Alert.alert("Logged out", "You have been logged out.");
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Settings</Text>


      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('TermsAndConditions')}
      >
        <Text style={styles.itemText}>Terms and Conditions</Text>
        <Icon name="chevron-right" type="material" color="#000" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('PrivacyPolicy')}
      >
        <Text style={styles.itemText}>Privacy Policy</Text>
        <Icon name="chevron-right" type="material" color="#000" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('CookiePolicy')}
      >
        <Text style={styles.itemText}>Cookie Policy</Text>
        <Icon name="chevron-right" type="material" color="#000" />
      </TouchableOpacity>
      <View style={styles.item}>
        <Text style={styles.itemText}>Push Notifications</Text>
        <Switch
          value={isPushEnabled}
          onValueChange={toggleSwitch}
          color="#4caf50"
        />
      </View>
      <View style={styles.item}>
        <TouchableOpacity onPress={handleLogout}><Text style={styles.itemText}>Logout</Text></TouchableOpacity>
       
        <Icon
            name="logout"
            type="material-community"
            color="#fff"
            style={{ marginRight: 10 }}
          />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:'#ffff'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  
  },
  itemText: {
    fontSize: 18,
      color:"black"
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#d32f2f',
  },
});

export default SettingsScreen;

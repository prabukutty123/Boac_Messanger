import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity } from 'react-native';

const HomeScreen = ({ route, navigation }) => {
    const { phoneNumber, authToken } = route.params; // Destructure authToken from route.params
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://13.126.51.141:3009/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`, // Include the auth token in the headers
                },
            });
            const data = await response.json();
            if (response.ok) {
                const otherUsers = data.users.filter(user => user.phoneNumber !== phoneNumber);
                setUsers(otherUsers);
            } else {
                Alert.alert(data.message);
            }
        } catch (error) {
            Alert.alert('Failed to fetch users');
        }
    };

    const navigateToChat = (otherUser) => {
        navigation.navigate('Chat', { currentUser: { phoneNumber }, otherUser });
    };

    return (
        <View>
            <FlatList
                data={users}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigateToChat(item)}>
                        <View>
                            <Text>{item.name}</Text>
                            <Text>{item.phoneNumber}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default HomeScreen;

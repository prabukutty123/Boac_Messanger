import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  const { user, token } = route.params;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://192.168.0.87:3001/get-messages/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const formattedMessages = response.data.messages.map((msg) => ({
          _id: msg._id,
          text: msg.message,
          createdAt: msg.timestamp,
          user: {
            _id: msg.sender === user._id ? 2 : 1, // Adjust user IDs appropriately
            name: msg.sender === user._id ? user.name : 'You', // Adjust names
          },
        }));

        setMessages(formattedMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [user._id, token]);

  const onSend = async (newMessages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));

    const message = newMessages[0];

    try {
      await axios.post('http://192.168.0.87:3001/send-message', {
        receiverId: user._id,
        message: message.text,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return <GiftedChat messages={messages} onSend={(messages) => onSend(messages)} user={{ _id: 1 }} />;
}

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
        const response = await axios.get(`http://192.168.0.84:3009/get-messages/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Formatting messages to work with GiftedChat
        const formattedMessages = response.data.messages.map((msg) => ({
          _id: msg._id,
          text: msg.message,
          createdAt: new Date(msg.timestamp),  // Ensure timestamp is in Date format
          user: {
            _id: msg.sender === user._id ? user._id : 'other',  // Ensure correct user ID
            name: msg.sender === user._id ? user.name : 'Other User', // Adjust names
          },
        }));

        setMessages(formattedMessages.reverse()); // Reverse to show the latest message at the bottom
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
      await axios.post('http://192.168.0.84:3009/send-message', {
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

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{ _id: 'other' }}  // Current user should be 'other' to distinguish
    />
  );
}

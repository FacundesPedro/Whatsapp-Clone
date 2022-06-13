import * as React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import { View } from '../components/Themed';
import ChatListItem from '../components/ChatListItem';
import NewMessageButton from "../components/NewMessageButton";
import {useEffect, useState} from "react";
import { ChatRoom } from '../types';


export default function ChatsScreen() {

  const [chatRooms, setChatRooms] = useState<any>([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
        const chatsfromAPI = await import('../data/ChatRooms').then(res => res.default)
        setChatRooms(chatsfromAPI)
    }
    fetchChatRooms();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={{width: '100%'}}
        data={chatRooms}
        renderItem={({ item }) => <ChatListItem chatRoom={item} />}
        keyExtractor={(item) => item.id}
      />
      <NewMessageButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

});

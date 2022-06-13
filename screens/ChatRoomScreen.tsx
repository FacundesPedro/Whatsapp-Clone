import React, {useEffect, useState} from 'react';
import {FlatList, Text, ImageBackground, KeyboardAvoidingView } from 'react-native';

import { useRoute } from '@react-navigation/native';

import ChatMessage from "../components/ChatMessage";
import bg from "../assets/images/beck.png";
import InputBox from "../components/InputBox";
import { Message } from '../types';

const ChatRoomScreen = () => {

  const [messages, setMessages] = useState<any>([]);
  const [myId, setMyId] = useState<any>(null);



  useEffect(() => {
    const getMyMessages = async () =>{
      const messagesFromApi = await import('../data/Chats').then(res => res.default)
      setMessages(messagesFromApi.messages)
    }
    const getMyId = async () => {
      const user = await import('../data/Users').then(res => res.default[0])
      setMyId(user.id)
      await getMyMessages()
    }

    getMyId();

  }, [])

  console.log(`messages in state: ${messages.length}`)

  return (
    <ImageBackground style={{width: '100%', height: '100%'}} source={{uri:'https://i.pinimg.com/736x/39/37/d7/3937d74c7056584cc41d31a0e1791ac8.jpg'}}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <ChatMessage myId={myId} message={item} />}
        inverted
      />

      <InputBox chatRoomID={myId} />
    </ImageBackground>
  );
}

export default ChatRoomScreen;

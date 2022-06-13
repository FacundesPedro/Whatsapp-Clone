import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import { ChatRoom } from "../../types";
import styles from "./style";
import moment from "moment";
import { useNavigation } from '@react-navigation/native';

export type ChatListItemProps = {
  chatRoom: any;
}

const ChatListItem = (props: ChatListItemProps) => {
  const { chatRoom } = props;
  const [ otherUser, setOtherUser] = useState<any>(null);

  const navigation = useNavigation();

  useEffect(() => {
    const getOtherUser = async () => {
      const response = await import('../../data/Users').then(res => res.default)
      const otherUser = response[1]
      setOtherUser(otherUser)
    }
    getOtherUser();
  }, [])

  const onClick = () => {
    navigation.navigate('ChatRoom', {
      id: chatRoom.id,
      name: otherUser.name,
    })
  }

  if (!otherUser) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.lefContainer}>
          <Image source={{ uri: otherUser.imageUri }} style={styles.avatar}/>

          <View style={styles.midContainer}>
            <Text style={styles.username}>{otherUser.name}</Text>
            <Text
              numberOfLines={2}
              style={styles.lastMessage}>
              {chatRoom.lastMessage
                ? `Pedro Facundes: ${chatRoom.lastMessage.content}`
                : ""}
            </Text>
          </View>

        </View>

        <Text style={styles.time}>
          {chatRoom.lastMessage && moment(chatRoom.lastMessage.createdAt).format("DD/MM/YYYY")}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )
};

export default ChatListItem;

import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { getDoc } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import { GiftedChat } from 'react-native-gifted-chat'
import { onSnapshot } from "firebase/firestore";
import moment from "moment";


export default function ChatScreen() {
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const { user } = useUser();

  const [messages, setMessages] = useState([])

  useEffect(() => {
    GetUserDetails();

    const unsubscribe = onSnapshot(collection(db, 'Chats', params.id, 'Messages'), (snapshot) => {
      const messageData=snapshot.docs.map((doc)=>({
        _id:doc.id,
        ...doc.data()
      }));
      setMessages(messageData);
    });

    return()=>unsubscribe();
  }, []);

  const GetUserDetails = async () => {
    const docRef = doc(db, 'Chats', params?.id);
    const docSnap = await getDoc(docRef);

    const result = docSnap.data();
    console.log(result);

    const otherUser=result?.users.filter(item=>item.email!=user?.primaryEmailAddress?.emailAddress);
    console.log(otherUser);
    navigation.setOptions({
      headerTitle: otherUser[0]?.name,
      headerBackTitle: "Back",
    });
  };

  const onSend = async (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    newMessages[0].createdAt = moment().toISOString();
    await addDoc(collection(db, 'Chats', params.id, 'Messages'), newMessages[0]);
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      showUserAvatar={true}
      user={{
        _id: user?.primaryEmailAddress?.emailAddress,
        name: user?.fullName,
        avatar: user?.imageUrl,
      }}
    />
  );
}

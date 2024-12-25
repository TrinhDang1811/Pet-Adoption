import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { doc } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { getDoc } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";

export default function ChatScreen() {
  const params = useLocalSearchParams();
  const naigation = useNavigation();
  const { user } = useUser

  useEffect(() => {
    GetUserDetails();
  }, []);

  const GetUserDetails = async () => {
    const docRef = doc(db, "Chats", params?.id);
    const docSnap = await getDoc(docRef);

    const result = docSnap.data();
    console.log(result);

    const otherUser=result?.users.filter(item=>item.email!=user?.primaryEmailAddress?.emailAddress);
    console.log(otherUser);
    naigation.setOptions({
      headerTitle: otherUser[0]?.name,
      headerBackTitle: "Back",
    });
  };

  return (
    <View>
      <Text>ChatScreen</Text>
    </View>
  );
}

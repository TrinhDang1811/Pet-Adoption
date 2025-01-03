import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import React from "react";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { collection, query, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { useState } from "react";
import { getDocs, where } from "firebase/firestore";
import PetListItem from "../../components/Home/PetListItem";
import Colors from "../constants/Colors";

export default function UserPost() {
  const navigation = useNavigation();
  const { user } = useUser();
  const [userPostList, setUserPostList] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "User Post",
    });
    user && GetUserPost();
  }, [user]);

  const OnDeletePost = (docId) => {
    Alert.alert("Are you sure?", "Do you want to delete this post?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => deletePost(docId),
      },
    ]);
  };

  const deletePost = async (docId) => {
    await deleteDoc(doc(db, "Pets", docId));
    GetUserPost();
  };

  const GetUserPost = async () => {
    setLoader(true);
    setUserPostList([]);
    const q = query(
      collection(db, "Pets"),
      where("email", "==", user?.primaryEmailAddress?.emailAddress)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setUserPostList((prev) => [...prev, doc.data()]);
    });
    setLoader(false);
  };

  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 30,
        }}
      >
        UserPost
      </Text>

      <FlatList
        data={userPostList}
        refreshing={loader}
        onRefresh={GetUserPost}
        numColumns={2}
        renderItem={({ item, index }) => {
          return (
            <View>
              <PetListItem pet={item} key={index} />
              <Pressable
                onPress={() => OnDeletePost(item?.id)}
                style={styles.deleteButton}
              >
                <Text
                  style={{
                    fontFamily: "outfit",
                    textAlign: "center",
                  }}
                >
                  Delete
                </Text>
              </Pressable>
            </View>
          );
        }}
      />

      {userPostList?.length == 0 && <Text>No Post Found</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: Colors.LIGHT_PRIMARY,
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    marginRight: 10,
  },
});

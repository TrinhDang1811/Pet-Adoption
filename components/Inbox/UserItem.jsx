import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "../../app/constants/Colors";
import { Link } from "expo-router";

export default function UserItem({ userInfo }) {
  return (
    <View
      style={{
        marginVertical: 7,
      }}
    >
      <Link href={'/chat?id='+userInfo.docId}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: userInfo?.imageUrl }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 99,
            }}
          />

          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 20,
            }}
          >
            {userInfo?.name}
          </Text>
        </View>
      </Link>

      <View
        style={{
          borderWidth: 0.2,
          marginVertical: 7,
          borderColor: Colors.GRAY,
        }}
      ></View>
    </View>
  );
}

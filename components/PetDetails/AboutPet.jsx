import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import React from "react";
import Colors from "../../app/constants/Colors";

export default function AboutPet({ pet }) {
  const [readMore, setReadMore] = useState(true);
  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 20,
        }}
      >
        About {pet?.name}
      </Text>
      <Text
        numberOfLines={readMore ? 3 : 20}
        style={{
          fontFamily: "outfit",
          fontSize: 14,

          marginTop: 10,
        }}
      >
        {pet.about}
      </Text>
      {readMore ? (
        <Pressable onPress={() => setReadMore(false)}>
        <Text
          style={{
            marginLeft: 270,
            fontFamily: "outfit-medium",
            fontSize: 14,
            color: Colors.SECONDARY,
          }}
        >
          Read More
        </Text>
        </Pressable>
      ) : (
        <Pressable onPress={() => setReadMore(true)}>
        <Text
          style={{
            marginLeft: 270,
            fontFamily: "outfit-medium",
            fontSize: 14,
            color: Colors.SECONDARY,
          }}
        >
          Show Less
        </Text>
        </Pressable>
      )}
    </View>
  );
}

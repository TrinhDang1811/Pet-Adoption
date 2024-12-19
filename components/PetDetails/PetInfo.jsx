import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "../../app/constants/Colors";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function PetInfo({ pet }) {
  return (
    <View>
      <Image
        source={{ uri: pet.imageUrl }}
        style={{
          width: "100%",
          height: 400,
          objectFit: "cover",
        }}
      />

      <View
        style={{
          padding: 20,
          display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginRight: 15,
        }}
      >
        <View>
          <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 27
          }}>{pet?.name}</Text>

          <Text style={{
            fontFamily: 'outfit',
            fontSize: 16,
            color: Colors.GRAY,
          }}>{pet?.address}</Text>
          
        </View>

        <Ionicons name="heart-outline" size={30} color="black" />
      </View>
    </View>
  );
}

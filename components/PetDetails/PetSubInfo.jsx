import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "../../app/constants/Colors";
import PetSubInfoCard from "./PetSubInfoCard";

export default function PetSubInfo({ pet }) {
  return (
    <View
      style={{
        paddingHorizontal: 20,

      }}
    >
      <View style={{ display: "flex", flexDirection: "row" }}>
        

        <PetSubInfoCard 
        title='Age'
        icon={require('./../../assets/images/calendar.png')}
        value={pet?.age}
        />
        <PetSubInfoCard 
        title='Breed'
        icon={require('./../../assets/images/bone.png')}
        value={pet?.breed}
        />
        
      </View>

      <View style={{ display: "flex", flexDirection: "row" }}>
        

        <PetSubInfoCard 
        title='Sex'
        icon={require('./../../assets/images/sex.png')}
        value={pet?.sex}
        />
        <PetSubInfoCard 
        title='Weight'
        icon={require('./../../assets/images/weight.png')}
        value={pet?.weight+" kg"}
        />
        
      </View>

    </View>
  );
}

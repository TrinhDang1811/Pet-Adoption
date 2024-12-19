import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="home"
      options={{
        headerShown: false,
        title: "Home",
        tabBarIcon:({color})=><Ionicons name="home" size={24} color={color} />
      }}
      />
      <Tabs.Screen name="favorite"
      options={{
        headerShown: false,
        title: "Favorite",
        tabBarIcon:({color})=><Ionicons name="heart" size={24} color={color} />
      }}
      />
      <Tabs.Screen name="inbox" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

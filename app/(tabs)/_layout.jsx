import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from "../constants/Colors";

export default function TabLayout() {
  return (
    <Tabs 
    screenOptions={{
      tabBarActiveTintColor: Colors.PRIMARY
    }} 
    >
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
      <Tabs.Screen name="inbox"
      options={{
        headerShown: false,
        title: "Inbox",
        tabBarIcon:({color})=><Ionicons name="chatbubble" size={24} color={color} />
      }}
      />
      <Tabs.Screen name="profile"
      options={{
        headerShown: false,
        title: "Profile",
        tabBarIcon:({color})=><Ionicons name="person" size={24} color={color} />
      }}
      />
    </Tabs>
  );
}

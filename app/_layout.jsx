import * as SecureStore from "expo-secure-store";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import React from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";

const createTokenCache = () => {
  return {
    getToken: async (key) => {
      try {
        const item = await SecureStore.getItemAsync(key);
        if (item) {
          console.log(`${key} was used 🔐 \n`);
        } else {
          console.log("No values stored under key: " + key);
        }
        return item;
      } catch (error) {
        console.error("secure store get item error: ", error);
        await SecureStore.deleteItemAsync(key);
        return null;
      }
    },
    saveToken: (key, token) => {
      return SecureStore.setItemAsync(key, token);
    },
  };
};

const tokenCache = createTokenCache();

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  useFonts({
    outfit: require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
    "outfit-medium": require("../assets/fonts/Outfit-Medium.ttf"),
  });

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="login/index"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </ClerkProvider>
  );
}

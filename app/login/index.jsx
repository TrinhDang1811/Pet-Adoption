import { View, Text, Image, Pressable } from "react-native";
import React, { useCallback, useEffect } from "react";
import Colors from "../constants/Colors";
import * as WebBrowser from 'expo-web-browser'
import { useAuth, useOAuth, useUser } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking';
import { router, useRouter } from "expo-router";

export const useWarmUpBrowser = () => {
    React.useEffect(() => {
      void WebBrowser.warmUpAsync()
      return () => {
        void WebBrowser.coolDownAsync()
      }
    }, [])
  }
  
  WebBrowser.maybeCompleteAuthSession()

export default function LoginScreen() {

    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

    const onPressLogin = useCallback(async () => {
        try {
          const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
            redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myapp' }),
          })
    
          // If sign in was successful, set the active session
          if (createdSessionId) {
            
            await setActive({ session: createdSessionId });
          } else {
            // Use signIn or signUp returned from startOAuthFlow
            // for next steps, such as MFA
          }
        } catch (err) {
          // See https://clerk.com/docs/custom-flows/error-handling
          // for more info on error handling
          console.error(JSON.stringify(err, null, 2))
        }
      }, [])

      const { user } = useUser();
      const { isSignedIn } = useAuth();
      console.log(user, "User Logged Out");

      useEffect(() => {
        if(user){
            router.push("/home")
        }
      },[isSignedIn])
    

  return (
    <View
      style={{
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <Image
        source={require("./login.png")}
        style={{ width: "100%", height: 500 }}
      />
      <View
        style={{
          padding: 20,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 30,
            textAlign: "center",
          }}
        >
          Ready to make a new friend?
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 18,
            textAlign: "center",
            color: Colors.GRAY,
          }}
        >
          Lets adopt the pet you like and make their life happy again!
        </Text>

        <Pressable
        onPress={onPressLogin}
          style={{
            padding: 14,
            marginTop: 60,
            backgroundColor: Colors.PRIMARY,
            width: "100%",
            borderRadius: 14,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Get Started
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

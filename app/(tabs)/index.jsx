import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Link href={"/login"}>
        <Text>Go to Login Screen</Text>
      </Link>
    </View>
  );
}

import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { useState, useEffect } from "react";
import { FlatList } from "react-native";
import Colors from "../../app/constants/Colors";

export default function Category() {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Fish");

  useEffect(() => {
    GetCategories();
  }, []);

  const GetCategories = async () => {
    setCategoryList([]);
    const snapshot = await getDocs(collection(db, "Category"));
    snapshot.forEach((doc) => {
      console.log(doc.data());
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 20,
        }}
      >
        Category
      </Text>

      <FlatList
        data={categoryList}
        // horizontal={true}
        numColumns={4}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => setSelectedCategory(item.name)}
            style={{
              flex: 1,
            }}
          >
            <View
              style={[
                styles.container,
                selectedCategory == item.name && styles.selectedCategory,
              ]}
            >
              <Image
                source={{ uri: item?.imageUrl }}
                style={{
                  width: 40,
                  height: 40,
                }}
              />
            </View>

            <Text
              style={{
                fontFamily: "outfit",

                textAlign: "center",
              }}
            >
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.LIGHT_PRIMARY,
    padding: 15,
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    margin: 3,
  },

  selectedCategory: {
    backgroundColor: Colors.SECONDARY,
    borderColor: Colors.SECONDARY,
  },
});

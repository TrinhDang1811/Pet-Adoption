import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);

  useEffect(() => {
    getSliders();
  }, []);

  const getSliders = async () => {
    setSliderList([]);
    const snapshot = await getDocs(collection(db, "Sliders"));
    snapshot.forEach((doc) => {
      console.log(doc.data());
      setSliderList((sliderList) => [...sliderList, doc.data()]);
    });
  };

  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View>
            <Image
              source={{ uri: item?.imageUrl }}
              style={styles?.sliderImage}
            ></Image>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sliderImage: {
    width: Dimensions.get("screen").width * 0.9,
    height: 200,
    borderRadius: 15,
    marginRight: 20,
  },
});

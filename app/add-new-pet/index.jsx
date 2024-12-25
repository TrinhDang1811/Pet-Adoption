import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  Touchable,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Colors from "../constants/Colors";
import { useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRouter } from "expo-router";
import { db, storage } from "../../config/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { Pressable } from "react-native";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";

export default function AddNewPet() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({});
  const [gender, setGender] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [image, setImage] = useState();
  const {user} = useUser();
  const [loader, setLoader] = useState();
  const router = useRouter();


  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Pet",
    });
    GetCategories();
  }, []);

  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const GetCategories = async () => {
    setCategoryList([]);
    const snapshot = await getDocs(collection(db, "Category"));
    snapshot.forEach((doc) => {
      console.log(doc.data());
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  const handleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onSubmit = async () => {
    if (Object.keys(formData).length != 8) {
      ToastAndroid.show("Please fill all the fields", ToastAndroid.SHORT);
      return;
    }
    UploadImage();
  };

  const UploadImage=async()=>{
    setLoader(true)
    const resp = await fetch(image);
    const blobImage = await resp.blob();
    const storageRef = ref(storage, 'images/'+Date.now()+ '.jpg');

    uploadBytes(storageRef, blobImage).then((snapshot)=>{
      console.log('File uploaded')
      
    }).then(resp=>{
      getDownloadURL(storageRef).then(async(downloadUrl)=>{
        console.log(downloadUrl);
        SaveFormDate(downloadUrl)
      })
    })
  }

  const SaveFormDate=async(imageUrl)=>{
    const docId = Date.now().toString();
    await setDoc(doc(db,'Pets', docId),{
      ...formData,
      imageUrl:imageUrl,
      username:user?.fullName,
      email:user?.primaryEmailAddress.emailAddress,
      userImage:user?.imageUrl,
      id:docId
    })
    setLoader=(false)
    router.replace('/(tabs)/home')
  }

  return (
    <ScrollView
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 18,
        }}
      >
        Add New Pet for Adoption
      </Text>
      <Pressable onPress={imagePicker}>
        {!image ? (
          <Image
            source={require("../../assets/images/paws.png")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: Colors.GRAY,
            }}
          />
        ) : (
          <Image
            source={{ uri: image }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 15,
            }}
          />
        )}
      </Pressable>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Name *</Text>
        <TextInput
          placeholder="Enter Pet's Name"
          style={styles.input}
          onChangeText={(value) => handleInputChange("name", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Breed *</Text>
        <TextInput
          placeholder="Enter Pet's Breed"
          style={styles.input}
          onChangeText={(value) => handleInputChange("breed", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age *</Text>
        <TextInput
          placeholder="Enter Pet's Age"
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(value) => handleInputChange("age", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Category *</Text>
        <Picker
          selectedValue={selectedCategory}
          style={[styles.input, { height: 50 }]}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedCategory(itemValue);

            handleInputChange("category", itemValue);
          }}
        >
          {categoryList.map((category, index) => (
            <Picker.Item
              key={index}
              label={category.name}
              value={category.name}
            />
          ))}
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender *</Text>
        <Picker
          selectedValue={gender}
          style={[styles.input, { height: 50 }]}
          onValueChange={(itemValue, itemIndex) => {
            setGender(itemValue);

            handleInputChange("sex", itemValue);
          }}
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight *</Text>
        <TextInput
          placeholder="Enter Pet's Weight"
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(value) => handleInputChange("weight", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address *</Text>
        <TextInput
          placeholder="Enter Address"
          style={styles.input}
          onChangeText={(value) => handleInputChange("address", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.label, { textAlignVertical: "top" }]}>About </Text>
        <TextInput
          placeholder="Tell us about your pet"
          numberOfLines={5}
          multiline={true}
          style={[styles.input, { height: 100, textAlignVertical: "top" }]}
          onChangeText={(value) => handleInputChange("about", value)}
        />
      </View>

      <TouchableOpacity disabled={loader} onPress={onSubmit} style={styles.button}>
        {loader ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 20,
              color: Colors.WHITE,
              textAlign: "center",
            }}
          >
            Submit
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5,
  },

  input: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 7,
    fontFamily: "outfit",
  },

  label: {
    marginVertical: 5,
    fontFamily: "outfit",
  },

  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    marginVertical: 10,
    marginBottom: 50,
  },
});

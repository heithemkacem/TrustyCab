import React, { useState } from "react";
import MainContainer from "../components/containers/MainContainer";
import { View, ScrollView } from "react-native";
import RegularButton from "../components/buttons/RegularButton";
import IconHeader from "../components/icons/IconHeader";
import BigText from "../components/texts/BigText";
import * as ImagePicker from "expo-image-picker";
import { moveTo } from "../util/moveTo";

const Dashboard = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    if (!result.canceled) {
      setImage(result.assets[0].base64);
    }
  };
  return (
    <MainContainer>
      <View
        style={{
          marginTop: "30%",
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <IconHeader name="license" style={{ marginBottom: 30 }} />
          <BigText
            style={{
              marginBottom: 30,
              textAlign: "center",
            }}
          >
            Start your journey with us by checking the cab
          </BigText>
          <RegularButton onPress={() => moveTo(navigation, "Camera")}>
            Check the cab with your camera
          </RegularButton>
          <RegularButton onPress={() => pickImage()}>
            Load an image from Gallery
          </RegularButton>
        </ScrollView>
      </View>
    </MainContainer>
  );
};

export default Dashboard;

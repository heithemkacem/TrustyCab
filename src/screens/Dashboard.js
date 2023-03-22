import React from "react";
import MainContainer from "../components/containers/MainContainer";
import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import RegularButton from "../components/buttons/RegularButton";
import IconHeader from "../components/icons/IconHeader";
import BigText from "../components/texts/BigText";
import { styles } from "../styles/styles";
const Dashboard = () => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  //always check the permission before using the camera
  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <MainContainer>
        <View
          style={{
            marginTop: "50%",
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
            <RegularButton onPress={requestPermission}>
              Check the cab
            </RegularButton>
          </ScrollView>
        </View>
      </MainContainer>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={styles.cameraContainer}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default Dashboard;

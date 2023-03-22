import React from "react";
import MainContainer from "../components/containers/MainContainer";
import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import RegularButton from "../components/buttons/RegularButton";
import { styles } from "../styles/styles";
const Dashboard = () => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <MainContainer>
        <RegularButton onPress={requestPermission}>Check the cab</RegularButton>
      </MainContainer>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={styles.container}>
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

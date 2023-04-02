import { StatusBar } from "expo-status-bar";
import { Text, View, SafeAreaView, Button, Image } from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { shareAsync } from "expo-sharing";
import { styles } from "../styles/styles";
import * as MediaLibrary from "expo-media-library";
import PressableText from "../components/texts/PressableText";

const UserCamera = () => {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };
    useEffect(() => {
      (async () => {
        const cameraPermission = await Camera.requestCameraPermissionsAsync();
        const mediaLibraryPermission =
          await MediaLibrary.requestPermissionsAsync();
        setHasCameraPermission(cameraPermission.status === "granted");
        setHasMediaLibraryPermission(
          mediaLibraryPermission.status === "granted"
        );
      })();
    }, []);

    return (
      <SafeAreaView style={styles.cameraContainer}>
        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        <PressableText style={styles.button} title="Share" onPress={sharePic} />
        {hasMediaLibraryPermission ? (
          <PressableText
            style={styles.button}
            title="Save"
            onPress={savePhoto}
          />
        ) : undefined}
        <PressableText
          style={styles.button}
          title="Discard"
          onPress={() => setPhoto(undefined)}
        />
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.cameraContainer} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <PressableText
          title="Take Pic"
          style={styles.button}
          onPress={takePic}
        />
      </View>
      <StatusBar style="auto" />
    </Camera>
  );
};
export default UserCamera;

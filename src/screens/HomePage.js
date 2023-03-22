import React from "react";
import MainContainer from "../components/containers/MainContainer";
import RegularButton from "../components/buttons/RegularButton";
import Logo from "../components/imageComponent/Logo";
import { View } from "react-native";

const HomePage = ({ navigation }) => {
  const moveTo = (screen, payLoad) => {
    navigation.navigate(screen, { ...payLoad });
  };

  return (
    <MainContainer>
      <Logo
        src={require("./../assets/logo.png")}
        style={{ marginTop: "35%" }}
      />
      <View
        style={{
          height: 40,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <RegularButton onPress={() => moveTo("Login")}>
          Conenct to your account
        </RegularButton>
        <RegularButton onPress={() => moveTo("Signup")}>
          Create an account
        </RegularButton>
      </View>
    </MainContainer>
  );
};

export default HomePage;

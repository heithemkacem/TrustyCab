//!This is our model will be shown when the user request to show the response
import React from "react";
import { Modal, Text } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";
import RegularButton from "../buttons/RegularButton";
import { moveTo } from "../../util/moveTo";
const { black, fail, white } = colors;
const ModalPressableContainer = styled.Pressable`
  flex: 1;
  padding: 25px;
  justify-content: center;
  align-items: center;
`;
const ModalView = styled.View`
  border-radius: 20px;
  width: 100%;
  padding: 35px;
  align-items: center;
  elevation: 5;
  shadow-color: ${black};
  shadow-opacity: 0.25;
  shadow-radius: 3.84;
  background-color: ${black};
`;
const LoginModel = ({
  headerText,
  message,
  buttonText,
  modalVisible,
  navigation,
}) => {
  return (
    //animationType="slide" is the default value for the modal animation
    //other   animationType="fade" or animationType="none"
    <Modal animationType="fade" visible={modalVisible} transparent={true}>
      <ModalPressableContainer>
        <ModalView>
          <Text
            style={{
              marginBottom: 24,
              textAlign: "center",
              color: fail,
              fontSize: 20,
              fontWeight: "bold",
            }}
            color={fail}
          >
            {headerText}
          </Text>
          <Text
            color={white}
            style={{ marginBottom: 24, textAlign: "center", color: white }}
          >
            {message}
          </Text>

          <RegularButton
            onPress={() => {
              moveTo(navigation, "Login");
            }}
          >
            {buttonText}
          </RegularButton>
        </ModalView>
      </ModalPressableContainer>
    </Modal>
  );
};

export default LoginModel;

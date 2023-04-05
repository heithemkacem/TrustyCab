//!This is the input coponents of all forms
import React, { useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const { white, secondary, accent, lightGray, black } = colors;

const RowContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  top: -10px;
`;
const InputField = styled.TextInput`
  background-color: ${white};
  padding-left: 65px;
  padding-right: 65px;
  font-size: 16px;
  height: 60px;
  color: ${black};

  border-width: 2px;
`;

const LeftIcon = styled.View`
  position: absolute;
  top: 37px;
  left: 15px;
  z-index: 1;
  border-right-width: 2px;
  border-color: ${secondary};
  padding-right: 10px;
`;
const RightSubmit = styled.TouchableOpacity`
  position: absolute;
  top: 37px;
  right: 15px;
  z-index: 1;
`;

const StyledTextInput = ({
  icon,
  label,
  errors,
  isSubmitting,
  handleSubmit,
  ...props
}) => {
  const [inputBackgroundColor, setInputBackgroundColor] = useState("white");
  const customOnBlur = () => {
    props?.onBlur;
    setInputBackgroundColor("white");
  };
  const customOnFocus = () => {
    props?.onFocus;
    setInputBackgroundColor("white");
  };

  return (
    <View>
      <LeftIcon>
        <MaterialCommunityIcons name={icon} size={30} color={accent} />
      </LeftIcon>
      <InputField
        {...props}
        placeholderTextColor={lightGray}
        style={{
          backgroundColor: inputBackgroundColor,
          ...props?.style,
          borderRadius: "20px",
          marginTop: 22,
          borderColor: errors ? "red" : secondary,
        }}
        onBlur={customOnBlur}
        onFocus={customOnFocus}
      />

      {
        //if there is an error show the error message and the icon of error message
        errors && (
          //show text that contain the error message
          <RowContainer>
            <Text style={{ color: "red", fontWeight: 500 }}>{errors}</Text>
            <MaterialCommunityIcons name="alert-circle" size={25} color="red" />
          </RowContainer>
        )
      }

      {!isSubmitting && (
        <RightSubmit onPress={handleSubmit}>
          <MaterialCommunityIcons
            name={"arrow-right"}
            size={30}
            style={{ fontWeight: "600" }}
            color={black}
          ></MaterialCommunityIcons>
        </RightSubmit>
      )}
      {isSubmitting && (
        <RightSubmit disabled={true}>
          <ActivityIndicator size="small" color={black}></ActivityIndicator>
        </RightSubmit>
      )}
    </View>
  );
};

export default StyledTextInput;

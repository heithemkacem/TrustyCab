//!This is the regular button of all components
import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import RegularText from "../texts/RegularText";
const { accent, black } = colors;
const ButtonView = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${accent};
  width: 100%;
  justify-content: center;
  align-items: center;
  border-raduis: 40px;
  height: 60px;
  margin-bottom: 20px;
`;
const RegularButton = ({ color, ...props }) => {
  return (
    <ButtonView
      {...props}
      onPress={props.onPress}
      style={{ borderRadius: "20px" }}
    >
      <RegularText
        style={[{ color: black, fontWeight: 600, ...props?.textStyle }]}
      >
        {props.children}
      </RegularText>
    </ButtonView>
  );
};

export default RegularButton;

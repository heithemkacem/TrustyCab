import React from "react";
import { Text } from "react-native";
import { colors } from "../colors";
const { black } = colors;

const RegularText = (props) => {
  return (
    <Text
      {...props}
      style={{ fontSize: 15, color: props.color ? props.color : black }}
    >
      {props.children}
    </Text>
  );
};

export default RegularText;

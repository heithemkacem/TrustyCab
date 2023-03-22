import React from "react";

import { colors } from "../colors";
import { Text } from "react-native";
const { black } = colors;

const BigText = (props) => {
  return (
    <Text
      {...props}
      style={{
        fontSize: 25,
        fontWeight: 600,
        color: black,
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
};

export default BigText;

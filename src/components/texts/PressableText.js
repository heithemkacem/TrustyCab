import React from "react";
import { colors } from "../colors";
import SmallText from "../texts/SmallText";
import { Pressable } from "react-native";
const { black } = colors;

const PressableText = (props) => {
  return (
    <Pressable {...props} onPress={props.onPress}>
      <SmallText
        style={{
          color: black,
          fontWeight: 600,
          textAlign: "left",
          ...props.style,
        }}
      >
        {props.children || props.title}
      </SmallText>
    </Pressable>
  );
};

export default PressableText;

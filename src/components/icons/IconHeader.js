//!IconHeader is the components of Email verification icon in that Screen we can find the icon on top (it gives a good look to the screen ;) )
import React from "react";
import styled from "styled-components/native";
import { ScreenHeight } from "../shared";
import { colors } from "../colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const { white, accent } = colors;
const IconBg = styled.View`
  ${(props) => {
    return props.bgColor
      ? `background-color: ${props.bgColor}`
      : `background-color: ${accent}`;
  }}
  width: ${ScreenHeight * 0.15}px;
  height: ${ScreenHeight * 0.15}px;
  border-radius: ${ScreenHeight * 0.2};
  justify-content: center;
  align-items: center;
  align-self: center;
`;

const IconHeader = ({ name, color, bgColor, ...props }) => {
  return (
    <IconBg style={{ ...props.style }} bgColor={bgColor}>
      <MaterialCommunityIcons
        name={name}
        size={ScreenHeight * 0.15}
        color={color ? color : white}
      />
    </IconBg>
  );
};

export default IconHeader;

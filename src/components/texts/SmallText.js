import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
const { white } = colors;
const StyledText = styled.Text`
  font-size: 13px;
  color: ${white};
  text-align: center;
`;
const SmallText = (props) => {
  return <StyledText {...props}>{props.children}</StyledText>;
};

export default SmallText;

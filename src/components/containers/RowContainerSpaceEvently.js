//!This container give a row flex display of his childrens and space evently them
import React from "react";
import styled from "styled-components/native";
const StyledView = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 15px;
`;
const RowContainer = (props) => {
  return <StyledView {...props}>{props.children}</StyledView>;
};

export default RowContainer;

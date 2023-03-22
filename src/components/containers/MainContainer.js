//!This is the main container where you can adjust the padding and margin of the app
import React from "react";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native";
import { colors } from "../colors";
const { white } = colors;

const MainContainer = (props) => {
  return (
    <SafeAreaView
      style={{ flex: 1, padding: 25, backgroundColor: white }}
      {...props}
    >
      {props.children}
    </SafeAreaView>
  );
};

export default MainContainer;

import React from "react";
import IconHeader from "../icons/IconHeader";
import StarsReview from "../stars/StarsReview";
import FixedStars from "../stars/FixedStars";
import { View, ScrollView, Dimensions } from "react-native";
import BigText from "../texts/BigText";
import { colors } from "../colors";
const { white } = colors;

const TaxiView = ({ color, score }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          backgroundColor: color,
          padding: 20,
        }}
      >
        <FixedStars bgColor={color} stars={score} />
        <IconHeader name="taxi" color={white} bgColor={color} />

        <BigText color={white}>This is an avearge rating taxi </BigText>
      </View>
      <View
        style={{
          backgroundColor: color,
          padding: 40,
        }}
      >
        <StarsReview />
      </View>
    </ScrollView>
  );
};

export default TaxiView;

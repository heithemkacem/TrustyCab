import React from "react";
import IconHeader from "../icons/IconHeader";
import StarsReview from "../stars/StarsReview";
import FixedStars from "../stars/FixedStars";
import { View, ScrollView } from "react-native";
import BigText from "../texts/BigText";
import { colors } from "../colors";
const { white } = colors;

const TaxiView = ({ color, score, navigation }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          backgroundColor: color,
          padding: 20,
        }}
      >
        <FixedStars stars={score} />
        <IconHeader name="taxi" color={white} bgColor={color} />

        <BigText color={white}>
          This is {score === 3 ? "an avearge" : score > 3 ? "a good" : "a bad"}{" "}
          rating taxi
        </BigText>
      </View>
      <View
        style={{
          backgroundColor: color,
          padding: 40,
        }}
      >
        <StarsReview navigation={navigation} stars={score} />
      </View>
    </ScrollView>
  );
};

export default TaxiView;

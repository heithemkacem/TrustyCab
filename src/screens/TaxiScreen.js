import React, { useState } from "react";
import { View, SafeAreaView, ScrollView, Dimensions } from "react-native";
import BigText from "../components/texts/BigText";
import { colors } from "../components/colors";
import IconHeader from "../components/icons/IconHeader";
import StarsReview from "../components/stars/StarsReview";
import FixedStars from "../components/stars/FixedStars";
const TaxiScreen = () => {
  const [data, setData] = useState({
    color: "red",
    taxiStatus: "bad rating score",
    stars: 2,
  });
  const { white } = colors;
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          backgroundColor: data.color,
        }}
      >
        <IconHeader name="taxi" color={white} bgColor={data.color} />
        <FixedStars bgColor={data.color} stars={data.stars} />
        <BigText color={white}>This Cab has a {data.taxiStatus}</BigText>
      </View>
    </ScrollView>
  );
};

export default TaxiScreen;

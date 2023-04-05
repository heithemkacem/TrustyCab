import React from "react";

import { colors } from "../colors";

import TaxiView from "./TaxiView";

const Taxi = ({ score, navigation }) => {
  const { fail, success, avearge } = colors;

  return score < 3 ? (
    <TaxiView color={fail} score={score} navigation={navigation} />
  ) : score > 3 ? (
    <TaxiView color={success} score={score} navigation={navigation} />
  ) : (
    <TaxiView color={avearge} score={score} navigation={navigation} />
  );
};

export default Taxi;

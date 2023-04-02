import React from "react";

import { colors } from "../colors";

import TaxiView from "./TaxiView";

const Taxi = ({ score }) => {
  const { fail, success, avearge } = colors;

  return score < 3 ? (
    <TaxiView color={fail} score={score} />
  ) : score > 3 ? (
    <TaxiView color={success} score={score} />
  ) : (
    <TaxiView color={avearge} score={score} />
  );
};

export default Taxi;

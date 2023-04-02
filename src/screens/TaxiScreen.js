import React from "react";
import Taxi from "../components/taxi/Taxi";
import { useSelector } from "react-redux";
const TaxiScreen = () => {
  const taxi = useSelector((state) => state.taxi);
  console.log(taxi.taxi.score);
  return <Taxi score={taxi.taxi.score} />;
};

export default TaxiScreen;

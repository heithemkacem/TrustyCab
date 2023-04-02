import React from "react";
import Taxi from "../components/taxi/Taxi";
import { useSelector } from "react-redux";
const TaxiScreen = ({ navigation }) => {
  const taxi = useSelector((state) => state.taxi);
  return <Taxi score={taxi.taxi.score} navigation={navigation} />;
};

export default TaxiScreen;

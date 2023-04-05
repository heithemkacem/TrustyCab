import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "../../styles/styles";
import { updateRate } from "../../_actions/logicHandlerActions/userActions";
import LoginModel from "../modals/LoginModel";
const { useDispatch, useSelector } = require("react-redux");
const StarsReview = ({ stars, bgColor, navigation }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  let { isConnected } = auth;
  const taxiBanner = useSelector((state) => state.taxi.taxi.taxiBanner);
  const starRatingOptions = [1, 2, 3, 4, 5];
  const [starRating, setStarRating] = useState(stars);
  const animatedButtonScale = new Animated.Value(1);
  const [modalVisible, setModalVisible] = useState(false);
  const handlePressIn = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1.5,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };
  const handlePress = (option) => {
    if (isConnected === true) {
      setStarRating(option);
      dispatch(updateRate(option, taxiBanner));
    } else {
      setModalVisible(true);
    }
  };

  const animatedScaleStyle = {
    transform: [{ scale: animatedButtonScale }],
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
      <View style={styles.starsContainer}>
        <Text style={styles.starsHeading}>
          {starRating ? `${starRating} Stars` : "Give a rating"}
        </Text>
        <View style={styles.stars}>
          {starRatingOptions.map((option) => (
            <TouchableWithoutFeedback
              onPressIn={() => handlePressIn(option)}
              onPressOut={() => handlePressOut(option)}
              onPress={() => handlePress(option)}
              key={option}
            >
              <Animated.View style={animatedScaleStyle}>
                <MaterialIcons
                  name={starRating >= option ? "star" : "star-border"}
                  size={32}
                  style={
                    starRating >= option
                      ? styles.starSelected
                      : styles.starUnselected
                  }
                />
              </Animated.View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </View>
      <LoginModel
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        buttonText="Go to login"
        headerText="Login required !"
        message="Please connect to the your account to rate the taxi"
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

export default StarsReview;

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
const StarsReview = ({ stars, bgColor }) => {
  const starRatingOptions = [1, 2, 3, 4, 5];

  const [starRating, setStarRating] = useState(stars);

  const animatedButtonScale = new Animated.Value(1);

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

  const animatedScaleStyle = {
    transform: [{ scale: animatedButtonScale }],
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
      <View style={styles.starsContainer}>
        <Text style={styles.starsHeading}>
          {starRating ? `${starRating} Stars` : "Give a Rating"}
        </Text>
        <View style={styles.stars}>
          {starRatingOptions.map((option) => (
            <TouchableWithoutFeedback
              onPressIn={() => handlePressIn(option)}
              onPressOut={() => handlePressOut(option)}
              onPress={() => setStarRating(option)}
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
    </SafeAreaView>
  );
};

export default StarsReview;

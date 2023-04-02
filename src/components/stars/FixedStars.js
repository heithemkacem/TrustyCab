import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "../../styles/styles";
const FixedStars = ({ stars }) => {
  const starRatingOptions = [1, 2, 3, 4, 5];

  const [starRating, setStarRating] = useState(stars);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.starsContainer}>
        <View style={styles.stars}>
          {starRatingOptions.map((option) => (
            <TouchableWithoutFeedback key={option}>
              <Animated.View>
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

export default FixedStars;

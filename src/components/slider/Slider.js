//!This the component of the main slider
import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { moveTo } from "../../util/moveTo";
import { styles } from "../../styles/styles";

const Slider = ({ navigation }) => {
  const [showRealApp, setshowRealApp] = useState(false);

  const onDone = () => {
    setshowRealApp(true);
  };
  const onSkip = () => {
    setshowRealApp(true);
  };

  const buttonLabel = (label) => {
    return (
      <View
        style={{
          padding: 12,
          width: 100,
        }}
      >
        <Text
          style={{
            color: "#000000",
            backgroundColor: "#FFFFFF",
            borderRadius: 16,
            fontWeight: "600",
            fontSize: 14,
            padding: 10,
            textAlign: "center",
          }}
        >
          {label}
        </Text>
      </View>
    );
  };
  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Image style={styles.introImageStyle} source={item.image} />
        <Text style={styles.introTitleStyle}>{item.title}</Text>
        <Text style={styles.introTextStyle}>{item.subtitle}</Text>
      </View>
    );
  };
  return (
    <>
      <AppIntroSlider
        style={styles.containerOnBoarding}
        data={[
          {
            key: "s1",
            image: require("../../assets/slider-image/silder_get_reviews.png"),
            title: "Rate and Review",
            subtitle:
              "This app is a platform for taxi drivers to get reviews from their customers and to get a rating for their service",
          },
          {
            key: "s2",
            image: require("../../assets/slider-image/slider_check_if_the_taxi_is_well_rated.png"),
            title: "Scan the banner",
            subtitle:
              "This application allows you to scan the banner of the taxi and get the rating of it , so you can know if the taxi is well rated or not",
          },
          {
            key: "s3",
            image: require("../../assets/slider-image/slider_phone_and_photos.png"),
            title: "Update the taxi experience",
            subtitle:
              "You can update the taxi experience by taking photos and videos and uploading them to the app to help other people",
          },
        ]}
        renderItem={renderItem}
        onSkip={() => moveTo(navigation, "Login")}
        onDone={() => moveTo(navigation, "HomePage")}
        showPrevButton={true}
        showSkipButton={true}
        renderNextButton={() => buttonLabel("Next")}
        renderSkipButton={() => buttonLabel("Skip")}
        renderDoneButton={() => buttonLabel("Start")}
        renderPrevButton={() => buttonLabel("Previous")}
        activeDotStyle={{
          backgroundColor: "#FFFFFF",
          width: 50,
        }}
      />
    </>
  );
};

export default Slider;

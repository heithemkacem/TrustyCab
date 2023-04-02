import { StyleSheet } from "react-native";
import { colors } from "./../components/colors";
const { white, black, lightGray } = colors;
export const styles = StyleSheet.create({
  //!Slider
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    top: 70,
  },

  containerOnBoarding: {
    flex: 1,
    backgroundColor: lightGray,
    padding: 10,
  },

  titleStyle: {
    padding: 10,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  introTitleStyle: {
    marginTop: 30,
    fontSize: 25,
    color: white,
    textAlign: "left",
    marginBottom: 16,
    fontWeight: "bold",
    paddingLeft: 5,
    paddingRight: 5,
  },
  introTitleStyleAr: {
    marginTop: 30,
    fontSize: 25,
    color: white,
    textAlign: "right",
    marginBottom: 16,
    fontWeight: "bold",
    paddingLeft: 5,
    paddingRight: 30,
  },
  introImageStyle: {
    marginTop: 30,
    width: 220,
    height: 150,
    alignSelf: "center",
    borderRadius: 15,
  },
  introTextStyle: {
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 18,
    color: white,
    textAlign: "left",
    paddingTop: 30,
    lineHeight: 24,
  },
  introTextStyleAr: {
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 30,
    fontSize: 18,
    color: white,
    textAlign: "right",
    paddingTop: 30,
    lineHeight: 24,
  },
  //!RootStack
  containerRootStack: {
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 120,
  },

  //!Camera Screen
  cameraContainer: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#FFCC00",
    padding: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: "#FFCC00",
    alignSelf: "flex-end",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
  //!Stars Review
  starsContainer: {
    flex: 1,
    alignItems: "center",
  },
  starsHeading: {
    fontSize: 20,
    fontWeight: "bold",
    color: white,
    marginBottom: 15,
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  starUnselected: {
    color: white,
  },
  starSelected: {
    color: white,
  },
});

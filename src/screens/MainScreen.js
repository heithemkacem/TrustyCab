import React, { useState } from "react";
import MainContainer from "../components/containers/MainContainer";
import { View, ScrollView } from "react-native";
import RegularButton from "../components/buttons/RegularButton";
import IconHeader from "../components/icons/IconHeader";
import BigText from "../components/texts/BigText";
import * as ImagePicker from "expo-image-picker";
import { moveTo } from "../util/moveTo";
import { Formik } from "formik";
import { taxiBannerSchema } from "../util/validationSchemas";
import StyledTextInputWithSubmit from "../components/inputs/StyledTextInputWithSubmit";
import { colors } from "../components/colors";
import { useDispatch } from "react-redux";
import { getTaxi } from "../_actions/logicHandlerActions/userActions";
const MainScreen = ({ navigation }) => {
  const { accent, white } = colors;
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    if (!result.canceled) {
      setImage(result.assets[0].base64);
    }
  };
  const dispatch = useDispatch();
  return (
    <MainContainer>
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <IconHeader
            name="taxi"
            style={{ marginBottom: 30 }}
            color={accent}
            bgColor={white}
          />
          <BigText
            style={{
              marginBottom: 30,
              textAlign: "center",
            }}
          >
            Start your journey with us by checking the cab
          </BigText>
          <Formik
            initialValues={{ taxiBanner: "" }}
            validationSchema={taxiBannerSchema}
            onSubmit={(values, { setSubmitting }) => {
              dispatch(
                getTaxi(values.taxiBanner, navigation, moveTo, setSubmitting)
              );
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              isSubmitting,
              errors,
              touched,
            }) => (
              <>
                <StyledTextInputWithSubmit
                  icon="taxi"
                  placeholder={"Enter the taxi banner"}
                  autoCapitalize="none"
                  onChangeText={handleChange("taxiBanner")}
                  onBlur={handleBlur("taxiBanner")}
                  style={{ marginBottom: 25 }}
                  value={values.taxiBanner}
                  errors={touched.taxiBanner && errors.taxiBanner}
                  isSubmitting={isSubmitting}
                  handleSubmit={handleSubmit}
                />
              </>
            )}
          </Formik>
          <RegularButton onPress={() => moveTo(navigation, "Camera")}>
            Check the cab with your camera
          </RegularButton>
          <RegularButton onPress={() => pickImage()}>
            Load an image from Gallery
          </RegularButton>
        </ScrollView>
      </View>
    </MainContainer>
  );
};
export default MainScreen;

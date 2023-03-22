import React from "react";
import MainContainer from "../components/containers/MainContainer";
import StyledTextInput from "../components/inputs/StyledTextInput";
import { Formik } from "formik";
import RegularButton from "../components/buttons/RegularButton";
import { ActivityIndicator, ScrollView } from "react-native";
import { colors } from "../components/colors";
import IconHeader from "../components/icons/IconHeader";
import BigText from "../components/texts/BigText";
import PressableText from "../components/texts/PressableText";
import { useDispatch } from "react-redux";
import { ForgotPasswordAction } from "../_actions/logicHandlerActions/authActions";
import * as Yup from "yup";

const ForgetPassSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter your email address"),
});
const ForgotPassword = ({ navigation }) => {
  const { white } = colors;

  const dispatch = useDispatch();

  const moveTo = (screen, payLoad) => {
    navigation.navigate(screen, { ...payLoad });
  };

  return (
    <MainContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <IconHeader name="key" style={{ marginBottom: 30 }} />
        <BigText
          style={{
            marginBottom: 25,
          }}
        >
          Provide your email to reset your password
        </BigText>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={ForgetPassSchema}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(ForgotPasswordAction(values, setSubmitting, moveTo, t));
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
              <StyledTextInput
                icon="email"
                label={"Email"}
                placeholder={"Enter Your Email"}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                style={{ marginBottom: 25 }}
                value={values.email}
                errors={touched.email && errors.email}
              />

              {!isSubmitting && (
                <RegularButton onPress={handleSubmit}>
                  Reset Password
                </RegularButton>
              )}
              {isSubmitting && (
                <RegularButton disabled={true}>
                  <ActivityIndicator
                    size="small"
                    color={white}
                  ></ActivityIndicator>
                </RegularButton>
              )}
              <PressableText
                style={{ paddingTop: 15 }}
                onPress={() => moveTo("Signup")}
              >
                Dont have an account? Sign Up
              </PressableText>
            </>
          )}
        </Formik>
      </ScrollView>
    </MainContainer>
  );
};

export default ForgotPassword;

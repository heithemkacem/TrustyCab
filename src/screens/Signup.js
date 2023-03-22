import React from "react";
import MainContainer from "../components/containers/MainContainer";
import StyledTextInput from "../components/inputs/StyledTextInput";
import { Formik } from "formik";
import RegularButton from "../components/buttons/RegularButton";
import { ActivityIndicator, ScrollView } from "react-native";
import { colors } from "../components/colors";
import PressableText from "../components/texts/PressableText";
import { SignupAction } from "../_actions/logicHandlerActions/authActions";
import { useDispatch } from "react-redux";
import BigText from "../components/texts/BigText";
import * as Yup from "yup";

//The signup schema for validation with Yup
const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter your email address"),
  password: Yup.string()
    .required("Required")
    .min(8, "Too Short!")
    .max(24, "Too Long!")
    .matches(/(?=.*[0-9])/, "Password must contain a number.")
    .matches(/(?=.*[a-z])/, "Password must contain a lowercase letter.")
    .matches(/(?=.*[A-Z])/, "Password must contain a uppercase letter.")
    .matches(/(?=.*[!@#$%^&*])/, "Password must contain a special character."),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  fullName: Yup.string().required("FullName required"),
  phone: Yup.number().required("Phone number required"),
});

const SignUp = ({ navigation }) => {
  const { white } = colors;

  const dispatch = useDispatch();

  const moveTo = (screen, payLoad) => {
    navigation.navigate(screen, { ...payLoad });
  };

  return (
    <MainContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BigText style={{ marginBottom: 25 }}>Signup to enjoy your cab</BigText>
        <Formik
          initialValues={{
            fullName: "",
            phone: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(SignupAction(values, setSubmitting, moveTo, t));
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            isSubmitting,
            touched,
            errors,
          }) => (
            <>
              <StyledTextInput
                icon="account"
                label={"Full Name"}
                placeholder={"Enter Your Full Name"}
                autoCapitalize="none"
                onChangeText={handleChange("fullName")}
                onBlur={handleBlur("fullName")}
                style={{ marginBottom: 15 }}
                value={values.fullName}
                errors={touched.fullName && errors.fullName}
              />

              <StyledTextInput
                icon="email"
                label={"Your Email"}
                placeholder={"Enter Your Email Address"}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                style={{ marginBottom: 15 }}
                value={values.email}
                errors={touched.email && errors.email}
              />
              <StyledTextInput
                icon="phone"
                label={"Phone Number"}
                placeholder={"Enter Your Phone Number"}
                autoCapitalize="none"
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                style={{ marginBottom: 15 }}
                value={values.phone}
                errors={touched.phone && errors.phone}
              />
              <StyledTextInput
                icon="lock"
                label={"Password"}
                placeholder="**********"
                isPassword={true}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={handleChange("password")}
                value={values.password}
                onBlur={handleBlur("password")}
                style={{ marginBottom: 15 }}
                errors={touched.password && errors.password}
              />
              <StyledTextInput
                icon="lock"
                label={"Confirm Your Password"}
                isPassword={true}
                placeholder="**********"
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={handleChange("confirmPassword")}
                value={values.confirmPassword}
                onBlur={handleBlur("confirmPassword")}
                style={{ marginBottom: 15 }}
                errors={touched.confirmPassword && errors.confirmPassword}
              />

              {!isSubmitting && (
                <RegularButton onPress={handleSubmit}>
                  Create Account
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
                onPress={() => moveTo("Login")}
              >
                Have an account? Login
              </PressableText>
            </>
          )}
        </Formik>
      </ScrollView>
    </MainContainer>
  );
};

export default SignUp;

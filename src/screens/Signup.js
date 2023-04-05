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
import { moveTo } from "../util/moveTo";
import { SignupSchema } from "../util/validationSchemas";

const SignUp = ({ navigation }) => {
  const { white } = colors;

  const dispatch = useDispatch();

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
            dispatch(SignupAction(values, setSubmitting, moveTo, navigation));
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

              <PressableText onPress={() => moveTo(navigation, "Login")}>
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

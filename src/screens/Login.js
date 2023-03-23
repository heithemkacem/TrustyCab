import React from "react";
import MainContainer from "../components/containers/MainContainer";
import StyledTextInput from "../components/inputs/StyledTextInput";
import { Formik } from "formik";
import RegularButton from "../components/buttons/RegularButton";
import { ActivityIndicator, ScrollView } from "react-native";
import { colors } from "../components/colors";
import BigText from "../components/texts/BigText";
import PressableText from "../components/texts/PressableText";
import { useDispatch } from "react-redux";
import { LoginAction } from "../_actions/logicHandlerActions/authActions";
import { moveTo } from "../util/moveTo";
import { LoginSchema } from "../util/validationSchemas";
const Login = ({ navigation }) => {
  const { white } = colors;

  const dispatch = useDispatch();

  return (
    <MainContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BigText
          style={{
            marginBottom: 25,
          }}
        >
          Login to check your cab
        </BigText>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(LoginAction(values, setSubmitting, moveTo, t));
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
              <StyledTextInput
                icon="lock"
                label={"Password"}
                placeholder={"Enter Your Password"}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                isPassword={true}
                onChangeText={handleChange("password")}
                value={values.password}
                onBlur={handleBlur("password")}
                style={{ marginBottom: 25 }}
                errors={touched.password && errors.password}
              />

              {!isSubmitting && (
                <RegularButton onPress={handleSubmit}>Login</RegularButton>
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
                style={{ marginBottom: 15 }}
                onPress={() => moveTo(navigation, "Signup")}
              >
                Dont have an account ? Signup
              </PressableText>
              <PressableText
                onPress={() => moveTo(navigation, "ForgotPassword")}
              >
                Forgot password ?
              </PressableText>
            </>
          )}
        </Formik>
      </ScrollView>
    </MainContainer>
  );
};

export default Login;

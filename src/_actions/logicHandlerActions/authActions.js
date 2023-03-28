import axios from "axios";
import { SET_USER } from "../types";
import jwt_decode from "jwt-decode";
import { setAuth } from "../../util/setAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
const localUrl = "http://localhost:3000";
const devUrl = "https://sore-red-gopher-wear.cyclic.app/";
const currentUrl = localUrl;

//!Signup Admin
export const SignupAction =
  (credentials, setSubmitting, moveTo, navigation) => async (dispatch) => {
    try {
      await axios
        .post(`${currentUrl}/auth/signup`, credentials)
        .then((response) => {
          //!Check if the response is failed
          if (response.data.status === "Failed") {
            setSubmitting(false);
            Toast.show({
              type: "error",
              text1: "Error",
              text2: response.data.message,
            });
            //!Check if the response is success
          } else if (response.data.status === "Success") {
            setSubmitting(false);
            //?Move to the dashboard screen and show a success message
            Toast.show({
              type: "success",
              text1: "Success",
              text2: "You have received an email to verify your account",
            });
            console.log(response.data.user._id);
            moveTo(navigation, "EmailVerification", {
              id: response.data.user._id,
            });
            //! check if the user is verified
          }
        });
    } catch (error) {
      setSubmitting(false);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
    }
  };

//!Login Admin
export const LoginAction =
  (credentials, setSubmitting, moveTo, navigation) => async (dispatch) => {
    try {
      const { email, password } = credentials;
      await axios
        .post(`${currentUrl}/auth/login`, { email: email, password: password })
        .then((response) => {
          //!Check if the response is failed
          if (response.data.status === "Failed") {
            setSubmitting(false);
            Toast.show({
              type: "error",
              text1: "Error",
              text2: response.data.message,
            });
            //!Check if the response is success
          } else if (response.data.status === "Success") {
            //?Set the token in the header
            const { token } = response.data;
            setAuth(token);

            //?Decode the token
            const decode = jwt_decode(token);

            //?Set the user in the store and in the async storage
            dispatch(setUser(decode));
            AsyncStorage.setItem("jwt", token);

            //?Set the submitting to false
            setSubmitting(false);

            //?Move to the dashboard screen and show a success message
            Toast.show({
              type: "success",
              text1: "Success",
              text2: ` Welcome ${decode.fullName}}`,
            });

            moveTo(navigation, "Dashboard");
            //! check if the user is verified
          } else if (response.data.status === "Verify") {
            setSubmitting(false);
            moveTo(navigation, "EmailVerification", {
              id: response.data.userID,
            });
          }
        });
    } catch (error) {
      setSubmitting(false);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
    }
  };

//!User Forgot Password
export const ForgotPasswordAction =
  (credentials, setSubmitting, moveTo, navigation) => async (dispatch) => {
    try {
      //Call Backend
      await axios
        .post(`${currentUrl}/auth/forget-password`, credentials)
        .then(async (response) => {
          if (response.data.status === "Failed") {
            setSubmitting(false);
            Toast.show({
              type: "error",
              text1: "Error",
              text2: response.data.message,
            });
          } else if (response.data.status === "Success") {
            Toast.show({
              type: "success",
              text1: "Success",
              text2: response.data.message,
            });
            setSubmitting(false);
            moveTo(navigation, "ResetPassword", {
              id: response.data.id,
            });
          }
        })
        .catch((error) => {
          setSubmitting(false);
          Toast.show({
            type: "error",
            text1: "Error",
            text2: error.message,
          });
        });
    } catch (error) {
      setSubmitting(false);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
    }
  };

//! Reset Password Action

export const ResetPasswordAction =
  (values, setSubmitting, moveTo, route, navigation) => async (dispatch) => {
    try {
      //Call Backend
      const { newPassword, confirmNewPassword } = values;
      await axios
        .post(`${currentUrl}/auth/reset-password`, {
          id: route.params.id,
          password: newPassword,
          confirmPassword: confirmNewPassword,
        })
        .then((response) => {
          if (response.data.status === "Failed") {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: response.data.message,
            });
          } else if (response.data.status === "Success") {
            setSubmitting(false);
            Toast.show({
              type: "success",
              text1: "Success",
              text2: "You have successfully changed your password",
            });
            moveTo(navigation, "Login");
          }
        })
        .catch((error) => {
          setSubmitting(false);
          Toast.show({
            type: "error",
            text1: "Error",
            text2: error.message,
          });
        });
      setSubmitting(false);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
    }
  };

//!Verify Email
export const VerifyOTPAction =
  (code, route, setPinReady, moveTo, navigation) => async (dispatch) => {
    try {
      await axios
        .post(`${currentUrl}/otp/verify`, {
          userID: route.params.id,
          otp: code,
        })
        .then((response) => {
          //!Check if the response is failed
          if (response.data.status === "Failed") {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: response.data.message,
            });
            //!Check if the response is success
          } else if (response.data.status === "Success") {
            Toast.show({
              type: "success",
              text1: "Success",
              text2: "You have successfully verified your account",
            });
            setPinReady(false);
            moveTo(navigation, "Login");
            //! check if the user is verified
          }
        });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
    }
  };

//!Verify Email
export const VerifyOTPlModifyPasswordAction =
  (code, route, setPinReady) => async (dispatch) => {
    try {
      await axios
        .post(`${currentUrl}/otp/verify-modify-password`, {
          userID: route.params.id,
          otp: code,
        })
        .then((response) => {
          //!Check if the response is failed
          if (response.data.status === "Failed") {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: response.data.message,
            });
            //!Check if the response is success
          } else if (response.data.status === "Success") {
            Toast.show({
              type: "success",
              text1: "Success",
              text2: response.data.message,
            });
            setPinReady(false);
            //! check if the user is verified
          }
        });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
    }
  };

//!Resend Email OTP
export const ResendEmailAction =
  (route, setResendStatus) => async (dispatch) => {
    try {
      // make request to backend
      await axios
        .post(`${currentUrl}/otp/resend`, { userID: route.params.id })
        .then((response) => {
          if (response.data.status === "Failed") {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: response.data.message,
            });
          } else if (response.data.status === "Success") {
            setResendStatus("Sent");
            Toast.show({
              type: "success",
              text1: "Success",
              text2: "OTP has been resent",
            });
          }
        })
        .catch((error) => {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: error.message,
          });
        });
      // hold on briefly
      setTimeout(() => {
        setResendStatus("Resend");
      }, 4000);
    } catch (error) {
      setResendStatus("Failed");
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
    }
  };
//!Resend Email OTP
export const ResendModifyPasswordOTP =
  (route, setResendStatus) => async (dispatch) => {
    try {
      // make request to backend
      await axios
        .post(`${currentUrl}/otp/verify-modify-password-resend`, {
          userID: route.params.id,
        })
        .then((response) => {
          if (response.data.status === "Failed") {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: response.data.message,
            });
          } else if (response.data.status === "Success") {
            setResendStatus("Sent");
            Toast.show({
              type: "success",
              text1: "Success",
              text2: "OTP has been resent",
            });
          }
        })
        .catch((error) => {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: error.message,
          });
        });
      setResendingEmail(false);
      // hold on briefly
      setTimeout(() => {
        setResendStatus("Resend");
      }, 4000);
    } catch (error) {
      setResendingEmail(false);
      setResendStatus("Failed");
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
    }
  };
//!Logout User
export const Logout = () => async (dispatch) => {
  //?Remove the token from the header and from the async storage and set the user to an empty object (so when we check if the user is logged in we will check if the user object is empty or not )
  await AsyncStorage.removeItem("jwt");
  await dispatch({
    type: SET_USER,
    payload: {},
  });
};
export const setUser = (decode) => ({
  //?Set the user in the store
  type: SET_USER,
  payload: decode,
});

import axios from "axios";
import { SET_USER } from "../types";
import jwt_decode from "jwt-decode";
import { setAuth } from "../../util/setAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
const localUrl = "http://localhost:5000";
const devUrl = "https://sore-red-gopher-wear.cyclic.app/";
const currentUrl = devUrl;

//!Login Admin
export const LoginAction =
  (credentials, setSubmitting, moveTo, t) => async (dispatch) => {
    try {
      await axios
        .post(`${currentUrl}/admin/auth`, credentials)
        .then((response) => {
          //!Check if the response is failed
          if (response.data.status === "Failed") {
            setSubmitting(false);
            Toast.show({
              type: "error",
              text1: "Error",
              text2: t(response.data.message),
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
              text2: "Welcome",
            });

            moveTo("Dashboard");
            //! check if the user is verified
          } else if (response.data.status === "Verify") {
            setSubmitting(false);
            moveTo("EmailVerification", {
              email: credentials.email,
              id: response.data.id,
            });
          }
        });
    } catch (error) {
      setSubmitting(false);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: t(error.message),
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

import axios from "axios";
import Toast from "react-native-toast-message";
import { SET_TAXI } from "../types";
const localUrl = "http://localhost:3000";
const currentUrl = localUrl;

export const getTaxi =
  (taxiBanner, navigation, moveTo, setSubmitting) => (dispatch) => {
    const taxi = taxiBanner.toString();
    axios
      .post(`${currentUrl}/taxi`, {
        taxiBanner: taxi,
      })
      .then((response) => {
        if (response.data.status === "Failed") {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: response.data.message,
          });
          setSubmitting(false);
        } else if (response.data.status === "Success") {
          setSubmitting(false);
          dispatch(setTaxi(response.data.data));
          moveTo(navigation, "Taxi");
        }
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.response.data.message,
        });
        setSubmitting(false);
      });
  };
export const setTaxi = (taxi) => ({
  //?Set the user in the store
  type: SET_TAXI,
  payload: taxi,
});

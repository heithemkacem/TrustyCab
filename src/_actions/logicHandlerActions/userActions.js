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

export const updateRate = (rate, taxiBanner) => (dispatch) => {
  axios
    .post(`${currentUrl}/taxi/rate`, {
      taxiBanner: taxiBanner,
      reviewScore: rate,
    })
    .then((response) => {
      if (response.data.status === "Failed") {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: response.data.message,
        });
      } else if (response.data.status === "Success") {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Your rate has been updated",
        });
        dispatch(setTaxi(response.data.data));
      }
    })
    .catch((error) => {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response.data.message,
      });
    });
};
export const addComment =
  (comment, id, userId, showUser, setSubmitting) => (dispatch) => {
    const showComment = showUser.toString();
    axios
      .post(`${currentUrl}/comment`, {
        comment: comment,
        taxiId: id,
        user: userId,
        showUser: showComment,
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
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Your comment has been added",
          });
          setSubmitting(false);
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

export const getComments = (id, setComments) => (dispatch) => {
  axios
    .post(`${currentUrl}/comment/get-taxi-comments`, {
      taxiId: id,
    })
    .then((response) => {
      if (response.data.status === "Failed") {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: response.data.message,
        });
      } else if (response.data.status === "Success") {
        setComments(response.data.data);
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

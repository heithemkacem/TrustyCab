import axios from "axios";
// Set token to every request
export const setAuth = (token) => {
  //?Set token to every request
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

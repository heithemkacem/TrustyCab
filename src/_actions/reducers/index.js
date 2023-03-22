import { combineReducers } from "redux";
import authReducer from "./authReducer";
//? Combine all reducers into one root reducer and export it to be used in the store
export default combineReducers({
  auth: authReducer,
});

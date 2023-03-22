import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import Middleware from "redux-thunk";
import Reducers from "./reducers";

const initialState = {};
//? Create the store and export it to be used in the app
const store = createStore(
  Reducers,
  initialState,
  composeWithDevTools(applyMiddleware(Middleware))
);

export default store;

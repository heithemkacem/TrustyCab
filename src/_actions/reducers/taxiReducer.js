import isEmpty from "../../util/isEmpty";
import { SET_TAXI } from "../types";

//?the initial state of our state management system
const initialState = {
  taxi: {},
};

//?the reducer function that will be used to update the state of our state management system based on the action type and the payload
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_TAXI:
      return {
        ...state,
        taxi: action.payload,
      };

    default:
      return state;
  }
}

import { combineReducers } from "redux";
import cities from "./cityReducer";
import error from "./error";

export default combineReducers({
  cities,
  error
});

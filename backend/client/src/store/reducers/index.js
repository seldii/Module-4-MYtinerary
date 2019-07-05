import { combineReducers } from "redux";
import cityReducer from "./cityReducer";
import error from "./error";

export default combineReducers({
  city: cityReducer,
  error: error
});

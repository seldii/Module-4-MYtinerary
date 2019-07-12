import { combineReducers } from "redux";
import cities from "./cityReducer";
import error from "./error";
import itineraries from "./itineraryReducer";
import auth from "./authReducer";
import errorAuth from "./errorReducer";

export default combineReducers({
  cities,
  error,
  itineraries,
  auth,
  errorAuth
});

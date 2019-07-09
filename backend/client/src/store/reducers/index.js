import { combineReducers } from "redux";
import cities from "./cityReducer";
import error from "./error";
import itineraries from "./itineraryReducer";

export default combineReducers({
  cities,
  error,
  itineraries
});

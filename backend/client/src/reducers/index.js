import { combineReducers } from "redux";
import cityReducer from "./cityReducer";

export default combineReducers({
  city: cityReducer
});

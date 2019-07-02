import axios from "axios";
import {
  GET_CITIES,
  ADD_CITY,
  DELETE_CITY,
  UPDATE_CITY,
  CITIES_LOADING
} from "./types";

export const getCities = () => dispatch => {
  dispatch(setCitiesLoading());
  axios.get("/cities").then(res =>
    dispatch({
      type: GET_CITIES,
      payload: res.data
    })
  );
};

export const setCitiesLoading = () => {
  return {
    type: CITIES_LOADING
  };
};

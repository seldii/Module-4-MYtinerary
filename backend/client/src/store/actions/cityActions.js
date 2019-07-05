import axios from "axios";
import {
  GET_CITIES,
  ADD_CITY,
  DELETE_CITY,
  UPDATE_CITY,
  CITIES_LOADING
} from "./types";
import { setError } from "./errorActions";

export const getCities = () => dispatch => {
  dispatch(setCitiesLoading());
  axios.get("/cities").then(res =>
    dispatch({
      type: GET_CITIES,
      payload: res.data
    })
  );
};
export const addCity = city => async dispatch => {
  try {
    const res = await axios.post("/cities", city);
    dispatch({
      type: ADD_CITY,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setError(error.msg)));
    }
  }
};

export const setCitiesLoading = () => {
  return {
    type: CITIES_LOADING
  };
};

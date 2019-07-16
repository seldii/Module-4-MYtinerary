import axios from "axios";
import {
  GET_CITIES,
  GET_CITY,
  ADD_CITY,
  DELETE_CITY,
  UPDATE_CITY,
  CITIES_LOADING
} from "./types";
import { setError } from "./errorActions";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./authErrActions";

export const getCities = () => async dispatch => {
  dispatch(setCitiesLoading());
  const res = await axios.get("/cities");
  dispatch({
    type: GET_CITIES,
    payload: res.data
  });
};

export const getCity = id => async dispatch => {
  try {
    const res = await axios.get(`/cities/${id}`);
    dispatch({
      type: GET_CITY,
      payload: res.data
    });
  } catch (err) {
    console.log(err.response.data);
  }
};

export const updateCity = (id, city) => async (dispatch, getState) => {
  try {
    const res = await axios.patch(`/cities/${id}`, city, tokenConfig(getState));
    dispatch({
      type: UPDATE_CITY,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setError(error.msg)));
    }
  }
};
export const addCity = newCity => async (dispatch, getState) => {
  try {
    const res = await axios.post("/cities", newCity, tokenConfig(getState));
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

export const deleteCity = id => async (dispatch, getState) => {
  try {
    await axios.delete(`/cities/${id}`, tokenConfig(getState));
    dispatch({
      type: DELETE_CITY,
      payload: id
    });
  } catch (err) {
    console.log(err.response.data);
  }
};

export const setCitiesLoading = () => {
  return {
    type: CITIES_LOADING
  };
};

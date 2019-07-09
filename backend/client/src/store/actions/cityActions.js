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

export const updateCity = (id, city) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.patch(`/cities/${id}`, city, config);
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
export const addCity = newCity => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post("/cities", newCity, config);
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

export const deleteCity = id => async dispatch => {
  try {
    await axios.delete(`/cities/${id}`);
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

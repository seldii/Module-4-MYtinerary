import axios from "axios";
import {
  GET_ITINERARIES,
  GET_ITINERARY,
  CREATE_ITINERARY,
  DELETE_ITINERARY,
  UPDATE_ITINERARY
} from "./types";
import { setError } from "./errorActions";

export const getItineraries = () => async dispatch => {
  const res = await axios.get("/itineraries");
  dispatch({
    type: GET_ITINERARIES,
    payload: res.data
  });
};

export const getItinerary = id => async dispatch => {
  try {
    const res = await axios.get(`/itineraries/${id}`);
    dispatch({
      type: GET_ITINERARY,
      payload: res.data
    });
  } catch (err) {
    console.log(err.response.data);
  }
};

export const updateItinerary = (id, itinerary) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.patch(`/itineraries/${id}`, itinerary, config);
    dispatch({
      type: UPDATE_ITINERARY,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setError(error.msg)));
    }
  }
};
export const createItinerary = newItinerary => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post("/itineraries", newItinerary, config);
    dispatch({
      type: CREATE_ITINERARY,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setError(error.msg)));
    }
  }
};

export const deleteItinerary = id => async dispatch => {
  try {
    await axios.delete(`/itineraries/${id}`);
    dispatch({
      type: DELETE_ITINERARY,
      payload: id
    });
  } catch (err) {
    console.log(err.response.data);
  }
};

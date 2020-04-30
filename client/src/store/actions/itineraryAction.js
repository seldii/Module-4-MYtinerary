import axios from "axios";
import * as actionTypes from "./types";
import { setError } from "./errorActions";
import { tokenConfig } from "./authActions";

export const setItineraries = (itineraries) => {
  return {
    type: actionTypes.GET_ITINERARIES,
    itineraries: itineraries,
  };
};

export const fetchItinariesFailed = () => {
  return {
    type: actionTypes.FETCH_ITINERARIES_FAILED,
  };
};

export const getItineraries = () => {
  return (dispatch) => {
    axios
      .get("/itineraries")
      .then((response) => {
        dispatch(setItineraries(response.data));
      })
      .catch((error) => dispatch(fetchItinariesFailed()));
  };
};

export const getItinerary = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/itineraries/${id}`);
    dispatch({
      type: actionTypes.GET_ITINERARY,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setError(error.msg)));
    }
  }
};

export const getItinerariesByCity = (cityName) => async (dispatch) => {
  try {
    const res = await axios.get(`/itineraries/itineraries/${cityName}`);
    dispatch({
      type: actionTypes.GET_ITINERARIES_BY_CITYNAME,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setError(error.msg)));
    }
  }
};

//GET ITINERARIES BY USER

export const getItinerariesByUser = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/itineraries/profile/${userId}`);
    dispatch({
      type: actionTypes.GET_ITINERARIES_BY_USER,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setError(error.msg)));
    }
    console.log(err.response.data);
  }
};

export const updateItinerary = (id, itinerary) => async (
  dispatch,
  getState
) => {
  try {
    const res = await axios.patch(
      `/itineraries/${id}`,
      itinerary,
      tokenConfig(getState)
    );
    dispatch({
      type: actionTypes.UPDATE_ITINERARY,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setError(error.msg)));
    }
  }
};
export const createItinerary = (formData, user) => async (
  dispatch,
  getState
) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    const res = await axios.post(
      "/itineraries",
      formData,
      config,
      tokenConfig(getState)
    );
    dispatch({
      type: actionTypes.CREATE_ITINERARY,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setError(error.msg)));
    }
  }
};

export const deleteItinerary = (id) => async (dispatch, getState) => {
  try {
    await axios.delete(`/itineraries/${id}`, tokenConfig(getState));
    dispatch({
      type: actionTypes.DELETE_ITINERARY,
      payload: id,
    });
  } catch (err) {
    console.log(err.response.data);
  }
};

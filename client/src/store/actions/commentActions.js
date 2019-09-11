import axios from "axios";
import { getItinerary } from "./itineraryAction";
import { setError } from "./errorActions";
import { tokenConfig } from "./authActions";

export const addComment = (id, comment) => async (dispatch, getState) => {
  try {
    await axios.patch(
      `/itineraries/itinerary/${id}`,
      comment,
      tokenConfig(getState)
    );
    dispatch(getItinerary(id));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setError(error.msg)));
    }
  }
};
export const deleteComment = (id, comment) => async (dispatch, getState) => {
  try {
    await axios(
      { method: "DELETE", url: `/itineraries/itinerary/${id}`, data: comment },
      tokenConfig(getState)
    );
    dispatch(getItinerary(id));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setError(error.msg)));
    }
  }
};

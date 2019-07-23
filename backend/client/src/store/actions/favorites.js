import axios from "axios";
import { REMOVE_FAVORITE, ADD_FAVORITE } from "./types";
import { setError } from "./errorActions";
import { tokenConfig } from "./authActions";

export const addFavorite = favorite => async dispatch => {
  try {
    const res = await axios.patch(`/users/itinerary/`, favorite);
    dispatch({
      type: ADD_FAVORITE,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

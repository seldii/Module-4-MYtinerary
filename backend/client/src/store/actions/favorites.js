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
export const removeFavorite = favorite => async dispatch => {
  try {
    await axios({ method: "DELETE", url: "/users/itinerary/", data: favorite });
    dispatch({
      type: REMOVE_FAVORITE,
      payload: favorite
    });
  } catch (err) {
    console.log(err);
  }
};

import axios from "axios";
import { REMOVE_FAVORITE, ADD_FAVORITE } from "./types";
import { setError } from "./errorActions";
import { tokenConfig } from "./authActions";
import { loadUser } from "./authActions";

export const addFavorite = favorite => dispatch => {
  axios
    .patch(`/users/itinerary/`, favorite)
    .then(dispatch(loadUser()))
    .catch(err => {
      console.log(err);
    });
};
export const removeFavorite = favorite => dispatch => {
  axios({ method: "DELETE", url: "/users/itinerary/", data: favorite })
    .then(dispatch(loadUser()))
    .catch(err => {
      console.log(err);
    });
};

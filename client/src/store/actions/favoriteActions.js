import axios from "axios";
import * as actionTypes from "./types";
import { loadUser } from "./authActions";

export const setFavorites = (favorites) => {
  return {
    type: actionTypes.SET_FAVORITES,
    favorites: favorites,
  };
};

export const setFavoritesFailed = () => {
  return {
    type: actionTypes.SET_FAVORITES_FAILED,
  };
};

export const addFavoriteFailed = () => {
  return {
    type: actionTypes.ADD_FAVORITE_FAILED,
  };
};

export const removeFavoriteFailed = () => {
  return {
    type: actionTypes.REMOVE_FAVORITE_FAILED,
  };
};

export const fetchFavorites = (user) => (dispatch) => {
  const id = user._id;
  axios
    .get(`/users/favorites/${id}`)
    .then((response) => dispatch(setFavorites(response.data)))
    .catch((err) => {
      setFavoritesFailed();
    });
};

export const addFavorite = (favorite) => (dispatch) => {
  axios
    .patch(`/users/itinerary/`, favorite)
    .then(dispatch(loadUser()))
    .catch((err) => {
      dispatch(addFavoriteFailed());
    });
};
export const removeFavorite = (favorite) => (dispatch) => {
  axios({ method: "DELETE", url: "/users/itinerary/", data: favorite })
    .then(dispatch(loadUser()))
    .catch((err) => {
      dispatch(removeFavoriteFailed());
    });
};

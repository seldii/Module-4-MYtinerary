import * as actionTypes from "../actions/types";

const initialState = {
  favorites: [],
  loading: true,
  error: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_FAVORITES:
      return {
        ...state,
        favorites: action.favorites,
        loading: false,
        error: false,
      };
    case actionTypes.ADD_FAVORITE:
      return {
        ...state,
        favorites: [
          action.payload,
          ...state.favorites.filter((favorite) => favorite !== action.payload),
        ],
        loading: false,
      };
    case actionTypes.REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.pop(action.payload.favorite),
        loading: false,
      };
    case actionTypes.SET_FAVORITES_FAILED:
    case actionTypes.ADD_FAVORITE_FAILED:
    case actionTypes.REMOVE_FAVORITE_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
}

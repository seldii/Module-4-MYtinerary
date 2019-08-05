import { ADD_FAVORITE, REMOVE_FAVORITE } from "../actions/types";

const initialState = {
  favorites: [],
  loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_FAVORITE:
      return {
        ...state,
        favorites: [
          action.payload,
          ...state.favorites.filter(favorite => favorite !== action.payload)
        ],
        loading: false
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.pop(action.payload.favorite),
        loading: false
      };

    default:
      return state;
  }
}

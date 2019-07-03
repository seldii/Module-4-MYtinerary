import {
  GET_CITIES,
  ADD_CITY,
  DELETE_CITY,
  UPDATE_CITY,
  CITIES_LOADING
} from "../actions/types";

const initialState = {
  cities: [],
  value: "",
  filteredCities: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CITIES:
      return {
        ...state,
        cities: action.payload,
        loading: false
      };

    case CITIES_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}

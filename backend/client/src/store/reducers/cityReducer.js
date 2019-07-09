import {
  GET_CITIES,
  GET_CITY,
  ADD_CITY,
  DELETE_CITY,
  UPDATE_CITY,
  CITIES_LOADING
} from "../actions/types";

const initialState = {
  cities: [],
  city: {},
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
    case GET_CITY:
      return {
        ...state,
        city: action.payload,
        loading: false
      };
    case ADD_CITY:
      return {
        ...state,
        cities: [action.payload, ...state.cities],
        loading: false
      };

    case UPDATE_CITY:
      return {
        ...state,
        cities: [
          action.payload,
          ...state.cities.filter(city => city._id !== action.payload._id)
        ],
        loading: false
      };
    case DELETE_CITY:
      return {
        ...state,
        cities: state.cities.filter(city => city._id !== action.payload),
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

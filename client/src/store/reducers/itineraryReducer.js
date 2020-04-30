import * as actionTypes from "../actions/types";

const initialState = {
  itineraries: null,
  itinerary: null,
  itinerariesByCity: [],
  itinerariesByUser: [],
  loading: true,
  error: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_ITINERARIES:
      return {
        ...state,
        itineraries: action.itineraries,
        loading: false,
        error: false,
      };
    case actionTypes.FETCH_ITINERARIES_FAILED:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case actionTypes.GET_ITINERARY:
      return {
        ...state,
        itinerary: action.payload,
        loading: false,
      };

    case actionTypes.GET_ITINERARIES_BY_CITYNAME:
      return {
        ...state,
        itinerariesByCity: action.payload,
      };
    case actionTypes.GET_ITINERARIES_BY_USER:
      return {
        ...state,
        itinerariesByUser: action.payload,
      };
    case actionTypes.CREATE_ITINERARY:
      return {
        ...state,
        itineraries: [action.payload, ...state.itineraries],
        itinerariesByUser: [action.payload, ...state.itinerariesByUser],
        loading: false,
      };

    case actionTypes.UPDATE_ITINERARY:
      return {
        ...state,
        itineraries: [
          action.payload,
          ...state.itineraries.filter(
            (itinerary) => itinerary._id !== action.payload._id
          ),
        ],
        itinerariesByUser: [
          action.payload,
          ...state.itinerariesByUser.filter(
            (itinerary) => itinerary._id !== action.payload._id
          ),
        ],
        loading: false,
      };
    case actionTypes.DELETE_ITINERARY:
      return {
        ...state,
        itineraries: state.itineraries.filter(
          (itinerary) => itinerary._id !== action.payload
        ),
        itinerariesByUser: state.itinerariesByUser.filter(
          (itinerary) => itinerary._id !== action.payload
        ),
        loading: false,
      };

    default:
      return state;
  }
}

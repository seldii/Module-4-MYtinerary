import {
  GET_ITINERARIES,
  GET_ITINERARY,
  CREATE_ITINERARY,
  DELETE_ITINERARY,
  UPDATE_ITINERARY,
  GET_ITINERARIES_BY_CITYNAME,
  GET_ITINERARIES_BY_USER
} from "../actions/types";

const initialState = {
  itineraries: [],
  itinerary: null,
  itinerariesByCity: [],
  itinerariesByUser: [],
  loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ITINERARIES:
      return {
        ...state,
        itineraries: action.payload,
        loading: false
      };
    case GET_ITINERARY:
      return {
        ...state,
        itinerary: action.payload,
        loading: false
      };

    case GET_ITINERARIES_BY_CITYNAME:
      return {
        ...state,
        itinerariesByCity: action.payload
      };
    case GET_ITINERARIES_BY_USER:
      return {
        ...state,
        itinerariesByUser: action.payload
      };
    case CREATE_ITINERARY:
      return {
        ...state,
        itineraries: [action.payload, ...state.itineraries],
        loading: false
      };

    case UPDATE_ITINERARY:
      return {
        ...state,
        itineraries: [
          action.payload,
          ...state.itineraries.filter(
            itinerary => itinerary._id !== action.payload._id
          )
        ],
        loading: false
      };
    case DELETE_ITINERARY:
      return {
        ...state,
        itineraries: state.itineraries.filter(
          itinerary => itinerary._id !== action.payload
        ),
        loading: false
      };
    default:
      return state;
  }
}

import {
  SET_ERROR,
  REMOVE_ERROR,
  GET_ERRORS,
  CLEAR_ERRORS
} from "../actions/types";

const initialState = {
  msg: {},
  status: null,
  id: null,
  errors: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ERROR:
      return {
        ...state,
        errors: [payload, ...state.errors]
      };
    case REMOVE_ERROR:
      console.log(payload);
      return {
        ...state,
        errors: []
      };
    case GET_ERRORS:
      return {
        ...state,
        msg: payload.msg,
        status: payload.status,
        id: payload.id
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        msg: {},
        status: null,
        id: null
      };

    default:
      return state;
  }
}

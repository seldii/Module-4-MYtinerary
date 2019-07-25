import uuid from "uuid";
import { SET_ERROR, REMOVE_ERROR, GET_ERRORS, CLEAR_ERRORS } from "./types";

export const setError = text => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ERROR,
    payload: { text, id }
  });
  setTimeout(
    () =>
      dispatch({
        type: REMOVE_ERROR,
        payload: id
      }),
    3000
  );
};
export const returnErrors = (msg, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id }
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

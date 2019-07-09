import uuid from "uuid";
import { SET_ERROR, REMOVE_ERROR } from "./types";

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

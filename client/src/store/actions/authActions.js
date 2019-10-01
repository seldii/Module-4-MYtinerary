import axios from "axios";
import { returnErrors } from "./authErrActions";
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./types";

import { setError } from "./errorActions";

export const loadUser = () => (dispatch, getState) => {
  //User Loading
  dispatch({ type: USER_LOADING });

  axios
    .get("/auth/user", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

//Register User

export const register = formData => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };

  /* console.log("name", name);
  //Request body
  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", name);
  formData.append("email", email);
  formData.append("password", password);
  // Display the key/value pairs
  console.log(...formData); */
  console.log(...formData);
  axios
    .post("/users", formData, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(error => dispatch(setError(error.msg)));
      }
      dispatch({
        type: REGISTER_FAIL
      });
    });
};
//Login
export const login = ({ email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  //Request body

  const body = JSON.stringify({ email, password });

  axios
    .post("/auth", body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

export const tokenConfig = getState => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};

export const googleSignIn = response => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  //Request body

  const body = {
    name: response.profileObj.givenName,
    email: response.profileObj.email,
    image: response.profileObj.imageUrl,
    googleId: response.googleId,
    accessToken: response.accessToken
  };

  axios
    .post("/google", body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

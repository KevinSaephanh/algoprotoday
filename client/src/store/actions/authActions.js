import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT
} from "./actionTypes";

export const register = userData => {
  return async dispatch => {
    try {
      await axios.post("/api/users/register", userData);
      dispatch({
        type: REGISTER_SUCCESS
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: console.error(err)
      });
    }
  };
};

export const login = userData => {
  return async dispatch => {
    try {
      const res = await axios.post("/api/users/login", userData);
      //Create and set token in localStorage
      const { token } = res.data;
      setAuthToken(token);
      localStorage.setItem("jwtToken", token);

      // Decode token and set user in localStorage
      const decoded = jwt_decode(token);
      const user = {
        username: userData.username,
        token: decoded
      };
      //localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: LOGIN_SUCCESS,
        payload: user
      });
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: console.error(err)
      });
    }
  };
};

export const logout = () => {
  console.log("LOGGING OUTTTTT");
  return dispatch => {
    dispatch({
      type: LOGOUT
    });

    // Remove contents from local storage
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    // Remove auth header for future requests
    setAuthToken(false);
    // // Reset state
    // dispatch({
    //   type: LOGIN_SUCCESS,
    //   payload: {}
    // });
  };
};

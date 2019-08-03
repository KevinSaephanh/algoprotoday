import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";
import {
  SET_CURRENT_USER,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  GET_ERRORS
} from "./actionTypes";

/*
Step 1: Use the data and make HTTP request to backend
Step 2: Take backend's response (jwtToken)
Step 3: Dispatch user just registered with jwtToken
Step 4: Save the jwtToken into localStorage
*/
export const register = (userData, history) => {
  return async dispatch => {
    try {
      await axios.post("/api/users/register", userData);
      dispatch({
        type: REGISTER_SUCCESS
      });
      history.push("/login");
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL
      });
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    }
  };
};

export const login = userData => {
  return async dispatch => {
    try {
      const res = await axios.post("/api/users/login", userData);
      dispatch({
        type: LOGIN_SUCCESS
      });
      //Create and set token
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);

      // Decode token and set user
      const decoded = jwt_decode(token);
      const user = {
        id: res.data.id,
        username: res.data.username,
        token: decoded
      };
      dispatch(setCurrentUser(user));
      window.location = `/profile/${user.id}`;
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL
      });

      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    }
  };
};

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

export const logout = () => {
  return dispatch => {
    dispatch({
      type: LOGOUT
    });

    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object
    dispatch(setCurrentUser({}));
  };
};

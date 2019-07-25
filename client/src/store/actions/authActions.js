import axios from "axios";
import * as Type from "./actionTypes";
import setAuthToken from "../../setAuthToken";
import { Types } from "mongoose";

export const register = (user, history) => dispatch => {
  axios
    .post("/api/user/register", user)
    .then(res => {
      dispatch({
        type: Type.default.USERS_ERROR,
        payload: {
          error: {}
        }
      });
      console.log(res);
      history.push("/login");
    })
    .catch(err => {
      dispatch({
        type: Type.default.USERS_ERRORS,
        payload: {
          error: err.response.data
        }
      });
    });
};

export const login = (user, history) => dispatch => {
  axios
    .post("/api/user/login", user)
    .then(res => {
      const token = res.data.token;
      localStorage.setItem("auth_token", token);
      setAuthToken(token);

      dispatch({
        type: Type.default.LOGIN,
        payload: {
          user: token
        }
      });
      history.push("/profile");
    })
    .catch(err => {
      console.log(err.response.data);
      dispatch({
        type: Type.default.USERS_ERRORS,
        payload: {
          err: err.response.data
        }
      });
    });
};

export const logout = history => {
  localStorage.removeItem("auth_token");
  history.push("/login");

  return {
    type: Types.default.LOGIN,
    payload: {
      user: {}
    }
  };
};

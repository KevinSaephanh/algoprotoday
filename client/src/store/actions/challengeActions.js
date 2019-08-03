import axios from "axios";
import {
  GET_CHALLENGES,
  CREATE_CHALLENGE,
  DELETE_CHALLENGE,
  GET_ERRORS
} from "./actionTypes";
import { getErrors } from "./errorActions";

export const getChallenges = () => {
  return async dispatch => {
    try {
      const res = await axios.get("/api/challenges");
      dispatch({
        type: GET_CHALLENGES,
        payload: res.data
      });
    } catch (err) {
      dispatch(getErrors(err.response.data, err.response.status));
    }
  };
};

export const getChallenge = () => {
  return async dispatch => {
    try {
      const id = "5d40a568b812160248103396"; //Placeholder
      const res = await axios.get(`/api/challenges/${id}`);
      dispatch({
        type: GET_CHALLENGES,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    }
  };
};

export const createChallenge = challenge => {
  return async dispatch => {
    try {
      const res = await axios.post("/api/challenges", challenge);
      dispatch({ type: CREATE_CHALLENGE, payload: res.data });
    } catch (err) {
      dispatch(getErrors(err.response.data, err.response.status));
    }
  };
};

export const deleteChallenge = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/challenges/${id}`);
      dispatch({
        type: DELETE_CHALLENGE,
        payload: id
      });
    } catch (err) {
      dispatch(getErrors(err.response.data, err.response.status));
    }
  };
};

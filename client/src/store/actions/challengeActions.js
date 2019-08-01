import axios from "axios";
import {
  GET_CHALLENGES,
  CREATE_CHALLENGE,
  DELETE_CHALLENGE,
  CHALLENGES_LOADING
} from "./actionTypes";
import { getErrors } from "./errorActions";

export const getChallenges = () => dispatch => {
  //dispatch(setChallengesLoading());
  axios
    .get("/api/challenges")
    .then(res =>
      dispatch({
        type: GET_CHALLENGES,
        payload: res.data
      })
    )
    .catch(err => dispatch(getErrors(err.response.data, err.response.status)));
};

export const getChallenge = () => dispatch => {
  const id = "5d40a568b812160248103396";
  axios.get(`/api/challenges/${id}`)
  .then(res => dispatch({
    type: GET_CHALLENGES,
    payload: res.data
  }));
}

export const createChallenge = challenge => (dispatch, getState) => {
  axios
    .post("/api/challenges", challenge)
    .then(res => dispatch({ type: CREATE_CHALLENGE, payload: res.data }))
    .catch(err => dispatch(getErrors(err.response.data, err.response.status)));
};

export const deleteChallenge = id => (dispatch, getState) => {
  axios
    .delete(`/api/challenges/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_CHALLENGE,
        payload: id
      })
    )
    .catch(err => dispatch(getErrors(err.response.data, err.response.status)));
};

export const setChallengesLoading = () => {
  return {
    type: CHALLENGES_LOADING
  };
};

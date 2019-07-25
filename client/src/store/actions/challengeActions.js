import {
  GET_CHALLENGES,
  CREATE_CHALLENGE,
  DELETE_CHALLENGE
} from "./actionTypes";

export const getChallenges = () => {
  return {
    type: GET_CHALLENGES
  };
};

export const createChallenge = () => {
  return {
    type: CREATE_CHALLENGE
  };
};

export const deleteChallenge = id => {
  return {
    type: DELETE_CHALLENGE,
    payload: id
  };
};

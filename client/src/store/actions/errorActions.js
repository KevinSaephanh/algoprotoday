import { GET_ERRORS } from "./actionTypes";

export const getErrors = (message, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: { message, status, id }
  };
};

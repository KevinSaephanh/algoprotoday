import { GET_ERRORS, CLEAR_ERRORS } from "./actionTypes";

export const getErrors = (id = null, message) => {
  return {
    type: GET_ERRORS,
    payload: { id, message }
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

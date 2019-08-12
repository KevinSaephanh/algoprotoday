import { GET_ERRORS, CLEAR_ERRORS } from "../actions/actionTypes";

const initState = {
  id: null,
  message: {}
};

export default (state = initState, aciton) => {
  switch (aciton.type) {
    case GET_ERRORS:
      return {
        id: aciton.payload.id,
        message: aciton.payload.message
      };
    case CLEAR_ERRORS:
      return {
        id: null,
        message: null
      };
    default:
      return state;
  }
};

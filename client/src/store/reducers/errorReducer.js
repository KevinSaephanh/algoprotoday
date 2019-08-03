import { GET_ERRORS, CLEAR_ERRORS } from "../actions/actionTypes";

const initState = {
  errors: []
};

export default (state = initState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        payload: action.payload
      };
    case CLEAR_ERRORS:
      return {
        errors: {}
      };
    default:
      return state;
  }
};

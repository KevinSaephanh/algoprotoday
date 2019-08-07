import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT
} from "../actions/actionTypes";

const initState = {
  isAuthenticated: false,
  user: {},
  error: ""
};

export default (state = initState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: ""
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: ""
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.payload
      };
    case LOGOUT:
      return initState;
    default:
      return state;
  }
};

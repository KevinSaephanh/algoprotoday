import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  LOAD_USER,
  LOAD_USER_FAIL
} from "../actions/actionTypes";
import isEmpty from "is-empty";

const initState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case LOGOUT:
    case LOAD_USER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    case LOAD_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
};

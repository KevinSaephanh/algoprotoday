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
  user: {},
  errors: ""
};

export default (state = initState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        errors: null
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        errors: null
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case LOAD_USER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        errors: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        errors: null
      };
    case LOAD_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        errors: null
      };
    default:
      return state;
  }
};

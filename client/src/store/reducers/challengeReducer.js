import {
  GET_CHALLENGES,
  GET_CHALLENGE,
  CREATE_CHALLENGE,
  DELETE_CHALLENGE
} from "../actions/actionTypes";

const initState = {
  challenges: [],
  error: ""
};

export default (state = initState, action) => {
  switch (action.type) {
    case GET_CHALLENGES:
      return {
        ...state,
        challenges: action.payload,
        error: ""
      };
    case GET_CHALLENGE:
      return {
        ...state,
        challenges: action.payload,
        error: ""
      };
    case CREATE_CHALLENGE:
      return {
        ...state,
        challenges: [action.payload, ...state.challenges],
        error: ""
      };
    case DELETE_CHALLENGE:
      return {
        ...state,
        challenges: state.challenges.filter(
          challenge => challenge._id !== action.payload
        ),
        error: ""
      };
    default:
      return state;
  }
};

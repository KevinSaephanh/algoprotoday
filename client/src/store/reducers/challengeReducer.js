import {
  GET_CHALLENGES,
  GET_CHALLENGE,
  CREATE_CHALLENGE,
  DELETE_CHALLENGE
} from "../actions/actionTypes";

const initState = {
  challenges: [],
  challenge: {}
};

export default (state = initState, action) => {
  switch (action.type) {
    case GET_CHALLENGES:
      return {
        ...state,
        challenges: action.payload
      };
    case GET_CHALLENGE:
      return {
        ...state,
        challenge: action.payload
      };
    case CREATE_CHALLENGE:
      return {
        ...state,
        challenges: [action.payload, ...state.challenges]
      };
    case DELETE_CHALLENGE:
      return {
        ...state,
        challenges: state.challenges.filter(
          challenge => challenge._id !== action.payload
        )
      };
    default:
      return state;
  }
};

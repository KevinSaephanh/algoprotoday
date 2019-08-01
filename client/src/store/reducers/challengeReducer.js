import {
  GET_CHALLENGES,
  GET_CHALLENGE,
  CREATE_CHALLENGE,
  DELETE_CHALLENGE,
  CHALLENGES_LOADING
} from "../actions/actionTypes";

/*
  const initState = {
    challenges: [],
    loading: false
  }
*/

const initState = {
  challenges: [
    {
      title: "Missing Number in Integer Array",
      difficulty: "Easy",
      prompt:
        "How do you find the missing number in a given integer of 1 to 100?",
      solutions: []
    },
    {
      title: "Finding Duplicate Number in Integer Array",
      difficulty: "Easy",
      prompt:
        "How do you find the duplicate number in a given integer of 1 to 100?",
      solutions: []
    },
    {
      title: "Middle Element in Singly Linked List",
      difficulty: "Easy",
      prompt:
        "How do you find the middle element of a singly linked list in one pass?",
      solutions: []
    },
    {
      title: "Duplicate Characters in String",
      difficulty: "Intermediate",
      prompt: "How do you print duplicate characters from a string?",
      solutions: []
    },
    {
      title: "The Two Egg Problem",
      difficulty: "Hard",
      prompt:
        "A building has 100 floors. One of the floors is the highest floor an egg can be dropped from without breaking.If an egg is dropped from above that floor, it will break. If it is dropped from that floor or below, it will be completely undamaged and you can drop the egg again. Given two eggs, find the highest floor an egg can be dropped from without breaking, with as few drops as possible.",
      solutions: []
    },
    {
      title: "Vending Machine",
      difficulty: "Pro",
      prompt: "How do you design a vending machine?",
      solutions: []
    }
  ]
}; // Change this later

export default (state = initState, action) => {
  switch (action.type) {
    case GET_CHALLENGES:
      return {
        ...state,
        challenges: action.payload,
        loading: false
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
    case CHALLENGES_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

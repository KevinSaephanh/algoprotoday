import {
  GET_CHALLENGES,
  GET_CHALLENGE,
  CREATE_CHALLENGE,
  DELETE_CHALLENGE
} from "../actions/actionTypes";

/*
  const initState = {
    challenges: {}
  }
*/

const initState = {
  challenges: [
    {
      id: 1,
      title: "Missing Number in Integer Array",
      difficulty: "Easy",
      prompt:
        "How do you find the missing number in a given integer of 1 to 100?",
      solutions: []
    },
    {
      id: 2,
      title: "Finding Duplicate Number in Integer Array",
      difficulty: "Easy",
      prompt:
        "How do you find the duplicate number in a given integer of 1 to 100?",
      solutions: []
    },
    {
      id: 3,
      title: "Middle Element in Singly Linked List",
      difficulty: "Easy",
      prompt:
        "How do you find the middle element of a singly linked list in one pass?",
      solutions: []
    },
    {
      id: 4,
      title: "Duplicate Characters in String",
      difficulty: "Intermediate",
      prompt: "How do you print duplicate characters from a string?",
      solutions: []
    },
    {
      id: 5,
      title: "The Two Egg Problem",
      difficulty: "Hard",
      prompt:
        "A building has 100 floors. One of the floors is the highest floor an egg can be dropped from without breaking.If an egg is dropped from above that floor, it will break. If it is dropped from that floor or below, it will be completely undamaged and you can drop the egg again. Given two eggs, find the highest floor an egg can be dropped from without breaking, with as few drops as possible.",
      solutions: []
    },
    {
      id: 6,
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
      };
    case GET_CHALLENGE:
      return {
        ...state,
        challenges: action.payload
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

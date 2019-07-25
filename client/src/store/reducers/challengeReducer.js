import {
  GET_CHALLENGES,
  CREATE_CHALLENGE,
  DELETE_CHALLENGE
} from "../actions/actionTypes";
import uuid from "uuid";

const initState = {
  challenges: [
    {
      id: uuid(),
      title: "Missing Number in Integer Array",
      difficulty: "Easy",
      prompt:
        "How do you find the missing number in a given integer of 1 to 100?",
      solutions: []
    },
    {
      id: uuid(),
      title: "Finding Duplicate Number in Integer Array",
      difficulty: "Easy",
      prompt:
        "How do you find the duplicate number in a given integer of 1 to 100?",
      solutions: []
    },
    {
      id: uuid(),
      title: "Middle Element in Singly Linked List",
      difficulty: "Easy",
      prompt:
        "How do you find the middle element of a singly linked list in one pass?",
      solutions: []
    },
    {
      id: uuid(),
      title: "Duplicate Characters in String",
      difficulty: "Easy",
      prompt: "How do you print duplicate characters from a string?",
      solutions: []
    },
    {
      id: uuid(),
      title: "Vending Machine",
      difficulty: "Hard",
      prompt: "How do you design a vending machine?",
      solutions: []
    }
  ]
}; // Change this later

export default (state = initState, action) => {
  switch (action.type) {
    case GET_CHALLENGES:
      return {
        ...state
      };
    case CREATE_CHALLENGE:
      return;
    case DELETE_CHALLENGE:
      return {
        ...state,
        challenges: state.challenges.filter(
          challenge => challenge.id !== action.payload
        )
      };
    default:
      return state;
  }
};

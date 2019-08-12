import authReducer from "./authReducer";
import challengeReducer from "./challengeReducer";
import errorReducer from "./errorReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  challenge: challengeReducer,
  error: errorReducer
});

export default rootReducer;

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import throttle from "lodash/throttle";
/*
  Issues: 
    User being saved to local storage multiple times (nested)
    Challenges also being saved to local storage (only want user saved)
    */
// Get state from local Storage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("auth");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

// Serialize state and save to localStorage
const saveToLocalStorage = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("auth", serializedState);
  } catch (err) {
    console.log(err);
  }
};

const persistedState = loadFromLocalStorage();
const middleware = [thunk];
const store = createStore(
  rootReducer,
  persistedState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.subscribe(
  throttle(() => {
    console.log("Subscribing");
    saveToLocalStorage({ auth: store.getState().auth });
  }),
  1000
);

export default store;

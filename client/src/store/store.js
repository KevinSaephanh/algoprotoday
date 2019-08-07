import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";

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
    console.log(localStorage.getItem("auth"));
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

store.subscribe(() => {
  console.log("Subscribing");
  saveToLocalStorage({ auth: store.getState().auth });
});

export default store;

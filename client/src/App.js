import React, { Component } from "react";
import { Provider } from "react-redux";
import { LOGIN_SUCCESS } from "./store/actions/actionTypes";
import store from "./store/store";
import Routes from "./routes";
import "./App.css";

class App extends Component {
  componentDidMount() {
    if (localStorage.getItem("jwtToken")) {
      console.log("User is logged in");
      store.dispatch({ type: LOGIN_SUCCESS, payload: store.getState() });
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

export default App;

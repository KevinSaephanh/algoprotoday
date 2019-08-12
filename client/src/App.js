import React, { Component } from "react";
import { Provider } from "react-redux";
import { loadUser, logout } from "./store/actions/authActions";
import setAuthToken from "./utils/setAuthToken";
import jwtDecode from "jwt-decode";
import store from "./store/store";
import Routes from "./routes";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

// Check if user is logged in
if (localStorage.jwtToken) {
  try {
    const token = localStorage.jwtToken;
    setAuthToken(token);

    // Decode token and load user
    const decoded = jwtDecode(token);
    store.dispatch(loadUser(decoded));
    console.log(decoded);

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = "/login";
    }
  } catch (err) {
    console.log(err);
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

export default App;

import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logout } from "./store/actions/authActions";
import { Container } from "react-bootstrap";

// Components
import AppNavbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import ChallengeList from "./components/Challenge/ChallengeList";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Footer from "./components/Footer/Footer";
import PrivateRoute from "./components/private-routes/PrivateRoute";
import Profile from "./components/Profile/Profile";

// CSS
import "./App.css";

// Check for token to keep user logged in
// if (localStorage.jwtToken) {
//   // Set auth token header
//   const token = localStorage.jwtToken;
//   setAuthToken(token);

//   // Decode token and get user info
//   const decoded = jwt_decode(token);
//   store.dispatch(setCurrentUser(decoded));

//   // Check for expired token
//   const currentTime = Date.note() / 1000;
//   if (decoded.exp < currentTime) {
//     //Logout user
//     store.dispatch(logout());

//     //Redirect to login page
//     window.location.href = "/login";
//   }
// }

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Container>
            <AppNavbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/challenges" component={ChallengeList} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <PrivateRoute path="/profile" component={Profile} />
            </Switch>
            <Footer />
          </Container>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;

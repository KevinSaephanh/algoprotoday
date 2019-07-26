import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store/store";
import AppNavbar from "../components/Navbar/Navbar";
import Home from "./Home/Home";
import ChallengeList from "./Challenge/ChallengeList";
import Login from "./Auth/Login";
import Register from "./Auth/Register";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <div className="container">
            <AppNavbar />
            <Switch>
              <Route path="/challenges" component={ChallengeList} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/" component={Home} />
            </Switch>
            <footer>
              <p>Copyright &copy; AlgoProToday</p>
            </footer>
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;

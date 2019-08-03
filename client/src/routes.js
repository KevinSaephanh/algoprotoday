import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";

// Components
import AppNavbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import ChallengesPage from "./components/Challenges/ChallengesPage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Footer from "./components/Footer/Footer";

// Private routes
import PrivateRoute from "./components/private-routes/privateRoute";
import Profile from "./components/private-routes/Profile/Profile";
import Challenge from "./components/private-routes/Challenge/Challenge"; // Not private right now
import MockInterview from "./components/MockInterview/MockInterview";

const routes = () => {
  return (
    <BrowserRouter>
      <Container>
        <AppNavbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/challenges" component={ChallengesPage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/challenges/:id" component={Challenge} />
          <PrivateRoute path="/mock-interview" component={MockInterview} />
          <PrivateRoute path="/profile/:id" component={Profile} />
        </Switch>
        <Footer />
      </Container>
    </BrowserRouter>
  );
};

export default routes;

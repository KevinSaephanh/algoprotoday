import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Components
import Home from "./components/Home/Home";
import ChallengesPage from "./components/Challenges/ChallengesPage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

// Private routes
import PrivateRoute from "./components/private-routes/privateRoute";
import Profile from "./components/private-routes/Profile/Profile";
import ProfileEdit from "./components/private-routes/Profile/ProfileEdit";
import Challenge from "./components/private-routes/Challenge/Challenge";

const routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/challenges" component={ChallengesPage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute
                    exact
                    path="/challenges/:id"
                    component={Challenge}
                />
                <PrivateRoute
                    exact
                    path="/profile/:username"
                    component={Profile}
                />
                <PrivateRoute
                    exact
                    path="/profile_edit/:username"
                    component={ProfileEdit}
                ></PrivateRoute>
            </Switch>
        </BrowserRouter>
    );
};

export default routes;

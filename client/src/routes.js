import React, { lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Public routes
const Home = lazy(() => import("./components/Home/Home"));
const ChallengesPage = lazy(() =>
    import("./components/Challenges/ChallengesPage")
);
const Login = lazy(() => import("./components/Auth/Login"));
const Register = lazy(() => import("./components/Auth/Register"));
const UpdateAcc = lazy(() => import("./components/Auth/AccountAuth"));
const Verification = lazy(() => import("./components/Auth/Verification"));
const ErrorPage = lazy(() => import("./components/Error"));

// Private routes
const PrivateRoute = lazy(() =>
    import("./components/private-routes/PrivateRoute")
);
const Profile = lazy(() =>
    import("./components/private-routes/Profile/Profile")
);
const ProfileEdit = lazy(() =>
    import("./components/private-routes/Profile/ProfileEdit")
);
const Challenge = lazy(() =>
    import("./components/private-routes/Challenge/Challenge")
);

const routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/challenges" component={ChallengesPage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/auth" component={UpdateAcc} />
                <Route
                    exact
                    path="/verification/:token"
                    component={Verification}
                />
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
                <Route component={ErrorPage} />
            </Switch>
        </BrowserRouter>
    );
};

export default routes;

import React, { lazy, Suspense } from "react";
import { Container } from "reactstrap";
import { Provider } from "react-redux";
import { loadUser, logout } from "./store/actions/authActions";
import setAuthToken from "./utils/setAuthToken";
import jwtDecode from "jwt-decode";
import store from "./store/store";
import Loader from "./components/Loader/Loader";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

const AppNavbar = lazy(() => import("./components/Navbar/Navbar"));
const Footer = lazy(() => import("./components/Footer/Footer"));
const Routes = lazy(() => import("./routes"));

// Check if user is logged in
if (localStorage.jwtToken) {
    try {
        const token = localStorage.jwtToken;
        setAuthToken(token);

        // Decode token and load user
        const decoded = jwtDecode(token);
        store.dispatch(loadUser(decoded));

        // Check for expired token
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            store.dispatch(logout());
            window.location.href = "/";
        }
    } catch (err) {
        console.log(err);
    }
}

const App = () => {
    return (
        <Provider store={store}>
            <Container>
                <Suspense fallback={<Loader />}>
                    <AppNavbar />
                    <Routes />
                    <Footer />
                </Suspense>
            </Container>
        </Provider>
    );
};

export default App;

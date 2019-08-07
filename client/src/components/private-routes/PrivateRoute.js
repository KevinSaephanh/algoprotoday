import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const privateRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      user.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const mapStateToProps = state => ({
  user: state.auth
});

export default connect(mapStateToProps)(privateRoute);

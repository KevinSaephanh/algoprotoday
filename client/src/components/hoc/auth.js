import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "../Loader/Loader";

export default (ComposedClass, reload) => {
  class auth extends Component {
    state = {
      loading: true
    };

    componentDidMount() {
      this.props.dispatch(auth());
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        loading: false
      });

      if (!nextProps.user.isAuthenticated) {
        if (reload) {
          this.props.history.push("/login");
        }
      } else {
        if (reload === false) {
          this.props.history.push("/user");
        }
      }
    }

    render() {
      const { loading } = this.state;
      return !loading ? (
        <ComposedClass {...this.props} user={this.props.user} />
      ) : (
        <Loader />
      );
    }
  }

  const mapStateToProps = state => {
    return {
      user: state.auth
    };
  };

  return connect(mapStateToProps)(auth);
};

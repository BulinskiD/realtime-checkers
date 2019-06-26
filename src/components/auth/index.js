import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RegistrationForm from "./registrationForm";
import Login from "./loginForm";
import { LoginContainer, BackgroundContainer } from "../../styles/loginStyles";
import {
  loginWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "../../store/actions/auth";

export const Auth = props => {
  useEffect(
    () => {
      props.user.email && props.history.push("/");
    }, //eslint-disable-next-line
    [props.user.email]
  );

  return (
    <LoginContainer>
      {ReactDOM.createPortal(
        <BackgroundContainer url="/images/dark-chess.jpg" />,
        document.getElementById("root")
      )}
      <Route
        path={`${props.match.path}/`}
        exact
        component={routeProps => (
          <Login
            {...routeProps}
            loginWithEmailAndPassword={props.loginWithEmailAndPassword}
            user={props.user}
          />
        )}
      />
      <Route
        path={`${props.match.path}/register`}
        component={routeProps => (
          <RegistrationForm
            {...routeProps}
            user={props.user}
            createUserWithEmailAndPassword={
              props.createUserWithEmailAndPassword
            }
          />
        )}
      />
    </LoginContainer>
  );
};

Auth.propTypes = {
  createUserWithEmailAndPassword: PropTypes.func,
  loginWithEmailAndPassword: PropTypes.func,
  user: PropTypes.object
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { loginWithEmailAndPassword, createUserWithEmailAndPassword }
)(Auth);

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { LoginContainer, LoginForm, BackgroundContainer } from "./loginStyles";
import { loginWithEmailAndPassword } from "../store/actions/auth";

export const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = e => {
    e.preventDefault();
    props.loginWithEmailAndPassword(email, password, props.history);
  };

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
      <LoginForm onSubmit={e => handleLogin(e)}>
        {props.user.error && (
          <Alert className="text-center" variant="danger">
            {props.user.error}
          </Alert>
        )}
        <Form.Label>Email</Form.Label>
        <Form.Control
          className="mb-4 email"
          placeholder="Email"
          type="email"
          aria-label="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <hr />
        <Form.Label>Hasło</Form.Label>
        <Form.Control
          className="mb-4 password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Hasło"
        />
        <Button variant="success" className="float-left">
          Zarejestruj się!
        </Button>
        <Button variant="dark" className="float-right" type="submit">
          Zaloguj
        </Button>
      </LoginForm>
    </LoginContainer>
  );
};

Login.propTypes = {
  loginWithEmailAndPassword: PropTypes.func
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { loginWithEmailAndPassword }
)(Login);

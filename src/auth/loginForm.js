import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { LoginFormElement } from "./loginStyles";
import AlertBox from "../shared/alertBox";

const Login = props => {
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
    <LoginFormElement onSubmit={e => handleLogin(e)}>
      <AlertBox message={props.user.error} />
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
      <Link to={`${props.match.path}register`}>
        <Button variant="success" className="float-left">
          Zarejestruj się!
        </Button>
      </Link>
      <Button variant="dark" className="float-right" type="submit">
        Zaloguj
      </Button>
    </LoginFormElement>
  );
};

Login.propTypes = {
  user: PropTypes.object,
  loginWithEmailAndPassword: PropTypes.func
};

export default Login;

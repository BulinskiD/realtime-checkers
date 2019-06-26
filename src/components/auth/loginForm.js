import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { LoginFormElement } from "./loginStyles";
import AlertBox from "../shared/alertBox";
import Spinner from "react-bootstrap/Spinner";

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = e => {
    e.preventDefault();
    setLoading(true);
    props.loginWithEmailAndPassword(email, password, props.history);
  };

  return (
    <LoginFormElement onSubmit={e => handleLogin(e)}>
      {!loading ? (
        <React.Fragment>
          <AlertBox message={props.user.error} />
          <Form.Label>Email</Form.Label>
          <Form.Control
            className="mb-4 email"
            placeholder="Email"
            type="email"
            aria-label="email"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
          />
          <hr />
          <Form.Label>Hasło</Form.Label>
          <Form.Control
            className="mb-4 password"
            type="password"
            value={password}
            required
            minLength="6"
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
        </React.Fragment>
      ) : (
        <div className="text-center">
          <Spinner animation="border" variant="secondary" />
        </div>
      )}
    </LoginFormElement>
  );
};

Login.propTypes = {
  user: PropTypes.object,
  loginWithEmailAndPassword: PropTypes.func
};

export default Login;

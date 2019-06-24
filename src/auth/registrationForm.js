import React, { useState } from "react";
import AlertBox from "../shared/alertBox";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import PropTypes from "prop-types";
import { LoginFormElement } from "./loginStyles";

const RegistrationForm = props => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const handleRegistration = e => {
    e.preventDefault();
    if (
      password === repeatedPassword &&
      password.length !== 0 &&
      email.length !== 0
    ) {
      setLoading(true);
      props.createUserWithEmailAndPassword(email, password, setLoading);
    } else if (password.length !== 0) {
      setValidationMessage("Podane hasła różnią się od siebie!");
      setPassword("");
      setRepeatedPassword("");
    }
  };

  return (
    <LoginFormElement onSubmit={e => handleRegistration(e)}>
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
            onChange={e => setEmail(e.target.value)}
            minLength="6"
            required
          />
          <hr />
          <div
            className="text-center"
            style={{ fontSize: ".8em", color: "red" }}
          >
            {validationMessage}
          </div>
          <Form.Label>Hasło</Form.Label>
          <Form.Control
            className="mb-4 password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            minLength="6"
            required
            placeholder="Hasło"
          />
          <hr />
          <Form.Label>Powtórz hasło</Form.Label>
          <Form.Control
            className="mb-4 rpt-password"
            type="password"
            value={repeatedPassword}
            onChange={e => setRepeatedPassword(e.target.value)}
            placeholder="Hasło"
          />

          <Button variant="dark" className="float-right" type="submit">
            Zarejestruj
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

RegistrationForm.propTypes = {
  user: PropTypes.object,
  createUserWithEmailAndPassword: PropTypes.func
};

export default RegistrationForm;

import React, { useState, useEffect } from "react";
import AlertBox from "../shared/alertBox";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { LoginFormElement } from "./loginStyles";

const RegistrationForm = props => {
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
      props.createUserWithEmailAndPassword(email, password);
    } else if (password.length !== 0) {
      setValidationMessage("Podane hasła różnią się od siebie!");
      setPassword("");
      setRepeatedPassword("");
    }
  };

  return (
    <LoginFormElement onSubmit={e => handleRegistration(e)}>
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
      <span>{validationMessage}</span>
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
    </LoginFormElement>
  );
};

RegistrationForm.propTypes = {
  user: PropTypes.object,
  createUserWithEmailAndPassword: PropTypes.func
};

export default RegistrationForm;

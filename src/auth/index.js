import React, {useState} from 'react';
import {connect} from "react-redux";
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import {loginWithEmailAndPassword} from "../store/actions/auth";

export const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = e => {
        e.preventDefault();
        props.loginWithEmailAndPassword(email, password, props.history);
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
        <Form className="w-25 mt-4" onSubmit={e=>handleLogin(e)}>
            <Form.Label>Email</Form.Label>
            <Form.Control
                className="mb-4 email"
                placeholder="Email"
                type="email"
                aria-label="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />
            <Form.Label>Hasło</Form.Label>
            <Form.Control
                className="mb-4 password"
                type='password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="password"
            />
            <Button variant="primary" type="submit">
                Zaloguj
            </Button>
        </Form>
        </div>
    );
}

Login.propTypes = {
    loginWithEmailAndPassword: PropTypes.func
}

export default connect(null, {loginWithEmailAndPassword})(Login);
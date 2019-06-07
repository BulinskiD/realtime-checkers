import React, {useState} from 'react';
import {connect} from "react-redux";
import {loginWithEmailAndPassword} from "../actions/auth";

const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = e => {
        e.preventDefault();
        props.loginWithEmailAndPassword(email, password);
    };

    return (
        <form onSubmit={e=>handleLogin(e)}>
            <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder="email" />
            <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder="password" />
            <button type='submit'>Zaloguj</button>
        </form>
    );
}

export default connect(null, {loginWithEmailAndPassword})(Login);


import 'bootstrap/dist/css/bootstrap.css';

import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Login from './auth';

import Board from './board';
import {onUserAuthChange} from "./store/actions/auth";

const App = (props) => {

    useEffect(()=>{
        props.onUserAuthChange();
    }, //eslint-disable-next-line
        []);

    return (
        <Container>
            {props.authenticated ? <Board /> : <Login />}
        </Container>
    );
}

const mapStateToProps = (state) =>{
    return {
        authenticated: state.user.isLoggedIn
    }
}

export default connect(mapStateToProps, {onUserAuthChange})(App);

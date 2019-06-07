import 'bootstrap/dist/css/bootstrap.css';

import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import Login from './auth';

import Board from './board';
import {onUserAuthChange} from "./actions/auth";

const App = (props) => {

    useEffect(()=>{
        props.onUserAuthChange();
    },
        //eslint-disable-next-line
        []);

    return (
        <div>
            {props.authenticated ? <Board /> : <Login />}
        </div>
    );
}

const mapStateToProps = (state) =>{
    return {
        authenticated: state.user.isLoggedIn
    }
}

export default connect(mapStateToProps, {onUserAuthChange})(App);

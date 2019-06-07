import 'bootstrap/dist/css/bootstrap.css';

import React, {useEffect} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Authenticated from './shared/authenticated';
import ListGames from './list-games';
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

    if(props.loading)
        //Here will be loader
        return <div>Ladowanie</div>

        return (
            <BrowserRouter>
                <Container>
                    <Route path="/" exact component={(propsFromRoute) => <Authenticated {...propsFromRoute} authenticated={props.authenticated} display={<ListGames />} />} />
                    <Route path="/game/:id" component={(propsFromRoute) => <Authenticated {...propsFromRoute} authenticated={props.authenticated} display={<Board />} />} />
                    <Route path="/login" component={(propsFromRoute)=> <Login {...propsFromRoute} />} />
                </Container>
            </BrowserRouter>
        );
}

const mapStateToProps = (state) =>{
    return {
        authenticated: state.user.isLoggedIn,
        loading: state.user.initial
    }
}

export default connect(mapStateToProps, {onUserAuthChange})(App);

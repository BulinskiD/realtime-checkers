import 'bootstrap/dist/css/bootstrap.css';

import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route} from "react-router-dom";
import Authenticated from './shared/authenticated';
import ListGames from './list-games';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Login from './auth';

import Board from './board';
import {onUserAuthChange, onSelectedGameChange} from "./store/actions/auth";

export const App = (props) => {

    useEffect(()=>{
        props.onUserAuthChange();
    }, //eslint-disable-next-line
        []);

    useEffect( () => {
        if(props.user)
            props.onSelectedGameChange(props.user);
    },//eslint-disable-next-line
        [props.user])

    if(props.loading)
        //Here will be loader
        return <div>Ladowanie</div>

        return (
            <BrowserRouter>
                <Container>
                    <Route path="/" exact component={(propsFromRoute) => <Authenticated authenticated={props.authenticated} display={<ListGames {...propsFromRoute} />} />} />
                    <Route path="/game/:id" component={(propsFromRoute) => <Authenticated authenticated={props.authenticated} display={<Board {...propsFromRoute} />} />} />
                    <Route path="/login" component={(propsFromRoute)=> <Login {...propsFromRoute} />} />
                </Container>
            </BrowserRouter>
        );
}

const mapStateToProps = (state) =>{
    return {
        user: state.user.email,
        authenticated: state.user.isLoggedIn,
        loading: state.user.initial
    }
}

App.propTypes = {
    authenticated: PropTypes.bool,
    loading: PropTypes.bool,
    onUserAuthChange: PropTypes.func
}

export default connect(mapStateToProps, {onUserAuthChange, onSelectedGameChange})(App);

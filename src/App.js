import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { testAction } from "./actions";
import { loginWithEmailAndPassword } from "./actions/auth";

import Board from './board';

const App = (props) => {

    useEffect(()=>{
       props.loginWithEmailAndPassword("test", "test");
    }, [props]);

    return (
        <div><Board /></div>
    );
}

const mapStateToProps = (state) =>{
    return {
        info: state.test
    }
}

export default connect(mapStateToProps, {testAction, loginWithEmailAndPassword})(App);

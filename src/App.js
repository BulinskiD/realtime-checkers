import 'bootstrap/dist/css/bootstrap.css';

import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { testAction } from "./actions";

import Board from './board';

const App = (props) => {

    useEffect(()=>{
       props.testAction();
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

export default connect(mapStateToProps, {testAction})(App);

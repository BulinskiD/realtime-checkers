import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { testAction } from "./actions";

const App = (props) => {

    useEffect(()=>{
       props.testAction();
    }, [props]);

    return (
        <div>{props.info}</div>
    );
}

const mapStateToProps = (state) =>{
    return {
        info: state.test
    }
}

export default connect(mapStateToProps, {testAction})(App);

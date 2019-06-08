import React from 'react';
import {Redirect} from 'react-router-dom';

export default (props) => {
    if(props.authenticated)
        return (
            <React.Fragment>
                {props.display}
            </React.Fragment>
        );
    else {
        return (
            <Redirect to="/login" />
        )
    }
}

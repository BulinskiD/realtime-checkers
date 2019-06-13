import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

const Authenticated = (props) => {
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

Authenticated.propTypes = {
    authenticated: PropTypes.bool,
    display: PropTypes.element
};

export default Authenticated;
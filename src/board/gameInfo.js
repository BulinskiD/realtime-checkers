import React from 'react';
import PropTypes from 'prop-types';

const GameInfo = props => {

    const {message, isEnded} = props;

    return <div>{message}</div>;
}

GameInfo.propTypes = {
    message: PropTypes.string,
    isEnded: PropTypes.bool
}

export default GameInfo;
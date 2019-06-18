import React from 'react';
import PropTypes from 'prop-types';

const GameInfo = props => {

    return <div>{props.message}</div>;
}

GameInfo.propTypes = {
    message: PropTypes.string,
    isEnded: PropTypes.bool
}

export default GameInfo;
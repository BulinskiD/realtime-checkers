import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import InfoModal from '../shared/modal';

const GameInfo = props => {

    const {message, isEnded} = props;

    const [endMessage, setEndMessage] = useState(isEnded);

    if(isEnded) {
        return ReactDOM.createPortal(<InfoModal show={endMessage} onClose={() => setEndMessage(false)} title="Gra zakończona" buttonText="Ok">{message}</InfoModal>,
                                    document.getElementById("root"));
    }
    return <div>{message}</div>;
}

GameInfo.propTypes = {
    message: PropTypes.string,
    isEnded: PropTypes.bool
}

export default GameInfo;
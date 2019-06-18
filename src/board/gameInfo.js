import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import InfoModal from '../shared/modal';

const GameInfo = props => {

    const {message, isEnded} = props;
    const [endMessage, setEndMessage] = useState(false);

    useEffect(() => {
        setEndMessage(isEnded);
    }, [isEnded])


        return <React.Fragment>
                   <InfoModal show={endMessage} onClose={() => setEndMessage(false)} title="Gra zakończona" buttonText="Ok">{message}</InfoModal>
                   <div>{message}</div>
                </React.Fragment>
}

GameInfo.propTypes = {
    message: PropTypes.string,
    isEnded: PropTypes.bool
}

export default GameInfo;
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import InfoModal from "../shared/modal";
import { getMessage } from "../../utils/utilFunctions";

const GameInfo = props => {
  const { status } = props;
  const [message, setMessage] = useState({ text: "", isEnded: false });

  useEffect(() => {
    setMessage(getMessage(status));
  }, [status]);

  return (
    <React.Fragment>
      <InfoModal
        show={message.isEnded}
        onClose={() => setMessage({ ...message, isEnded: false })}
        title="Gra zakończona"
        buttonText="Ok"
      >
        {message.text}
      </InfoModal>
      <div>{message.text}</div>
    </React.Fragment>
  );
};

GameInfo.propTypes = {
  status: PropTypes.string
};

export default GameInfo;

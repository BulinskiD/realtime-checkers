import React from "react";
import PropTypes from "prop-types";

const MessagesList = () => {
  return <div>MessagesList</div>;
};

MessagesList.propTypes = {
  chat: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string,
      email: PropTypes.string
    })
  )
};

export default MessagesList;

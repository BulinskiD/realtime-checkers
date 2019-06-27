import React from "react";
import PropTypes from "prop-types";
import MessageItem from "./messageItem";

const MessagesList = props => {
  return (
    <React.Fragment>
      {props.chat.map(item => (
        <MessageItem email={props.email} message={item} key={item.email} />
      ))}
    </React.Fragment>
  );
};

MessagesList.propTypes = {
  chat: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string,
      email: PropTypes.string
    })
  )
};

export default MessagesList;

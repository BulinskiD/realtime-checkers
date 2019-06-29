import React from "react";
import PropTypes from "prop-types";
import { Message, MessageAuthor } from "../../styles/chatStyles";

const MessageItem = props => {
  const isActive = props.message.email === props.email;

  return (
    <Message isActive={isActive}>
      {props.message.content}
      <MessageAuthor>{props.message.email}</MessageAuthor>
    </Message>
  );
};

MessageItem.propTypes = {
  message: PropTypes.shape({
    content: PropTypes.string,
    email: PropTypes.string
  }),
  email: PropTypes.string
};

export default MessageItem;

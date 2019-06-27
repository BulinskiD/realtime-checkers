import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { firestore } from "../../api/firebase";
import { ChatContainer } from "../../styles/chatStyles";
import MessageForm from "./messageForm";
import MessagesList from "./messagesList";

export const Chat = props => {
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const chatSubscriber = firestore
      .collection("game")
      .doc(props.gameID)
      .onSnapshot(data => {
        setChat(data.data());
      });

    return () => chatSubscriber();
  }, []);

  return (
    <ChatContainer>
      <MessagesList chat={chat} />
      <MessageForm />
    </ChatContainer>
  );
};

Chat.propTypes = {
  gameID: PropTypes.string,
  email: PropTypes.string
};

const mapStateToProps = state => {
  return {
    email: state.user.email
  };
};

export default connect(
  mapStateToProps,
  null
)(Chat);

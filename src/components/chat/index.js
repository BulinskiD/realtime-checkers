import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { firestore } from "../../api/firebase";
import { ChatContainer } from "../../styles/chatStyles";
import MessageForm from "./messageForm";
import MessagesList from "./messagesList";

export const Chat = props => {
  const [chat, setChat] = useState([]);

  useEffect(
    () => {
      const chatSubscriber = firestore
        .collection("games")
        .doc(props.gameID)
        .collection("chat")
        .orderBy("created")
        .onSnapshot(data => {
          if (data.docs.length > 0) {
            let messages = [];
            data.docs.map(item =>
              messages.push({
                content: item.data().content,
                email: item.data().email,
                created: item.data().created
              })
            );
            setChat(messages);
          }
        });

      return () => chatSubscriber();
    }, //eslint-disable-next-line
    []
  );

  return (
    <ChatContainer>
      <MessagesList chat={chat} email={props.email} />
      <MessageForm email={props.email} gameID={props.gameID} />
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

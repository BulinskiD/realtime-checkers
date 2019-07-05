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
            const messages = data.docs.map(item => ({
              content: item.data().content,
              email: item.data().email,
              created: item.data().created
            }));
            setChat(messages);

            //Scroll to bottom on new message
            const messagesContainer = document.getElementById("chat");
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
          }
        });

      return () => chatSubscriber();
    }, //eslint-disable-next-line
    []
  );

  return (
    <React.Fragment>
      <ChatContainer id="chat">
        <MessagesList chat={chat} email={props.email} />
      </ChatContainer>
      <MessageForm email={props.email} gameID={props.gameID} />
    </React.Fragment>
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

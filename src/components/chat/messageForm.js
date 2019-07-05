import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { firestore } from "../../api/firebase";
import handleError from "../../utils/handleError";

const MessageForm = props => {
  const [message, setMessage] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await firestore
        .collection("games")
        .doc(props.gameID)
        .collection("chat")
        .add({
          content: message,
          email: props.email,
          created: Date.now()
        });
      setMessage("");
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Form onSubmit={e => handleSubmit(e)}>
      <Form.Control
        className="message"
        placeholder="Wiadomość"
        type="text"
        aria-label="title"
        value={message}
        required
        minLength={4}
        onChange={e => setMessage(e.target.value)}
      />
      <Button variant="dark" className="float-right" type="submit">
        Wyślij
      </Button>
    </Form>
  );
};

MessageForm.propTypes = {
  email: PropTypes.string,
  gameID: PropTypes.string
};

export default MessageForm;

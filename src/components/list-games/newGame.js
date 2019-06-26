import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import { NewGameForm } from "../../styles/gamesStyles";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { firestore } from "../../api/firebase";
import { connect } from "react-redux";
import { selectGame } from "../../store/actions/checkers";
import signUpToGame from "../../utils/signUpToGame";

export const NewGame = props => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");

  const addNewGame = async e => {
    e.preventDefault();
    try {
      const resp = await firestore.collection("games").add({ title });
      props.selectGame(resp.id);
      await signUpToGame(props.user.email, resp.id, []);
      props.history.push("/game/" + resp.id);
    } catch (error) {}
    setTitle("");
  };

  if (!props.user.gameID)
    return (
      <React.Fragment>
        <h4 className="my-3">
          Nowa gra:
          <Button
            variant="dark"
            onClick={() => setShow(!show)}
            className="float-right"
          >
            {show ? "-" : "+"}
          </Button>
        </h4>
        <hr />
        <NewGameForm show={show ? 1 : 0} onSubmit={e => addNewGame(e)}>
          <Form.Label>Nazwa</Form.Label>
          <Form.Control
            className="mb-4 title"
            placeholder="Nazwa"
            type="text"
            aria-label="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <Button variant="dark" className="float-right" type="submit">
            Dodaj!
          </Button>
        </NewGameForm>
      </React.Fragment>
    );

  return (
    <Link to={`/game/${props.user.gameID}`}>
      <Button variant="danger">Powróć do gry!</Button>
    </Link>
  );
};

NewGame.propTypes = {
  user: PropTypes.object,
  selectGame: PropTypes.func
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { selectGame }
)(NewGame);

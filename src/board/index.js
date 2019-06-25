import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { BoardContainer, FlexContainer } from "./boardStyles";
import { firestore } from "../api/firebase";
import { connect } from "react-redux";
import {
  setNewGameState,
  setActivePoles,
  selectGame,
  clearCurrentGame
} from "../store/actions/checkers";
import getActivePoles from "../utils/getActivePoles";
import Pole from "./pole";
import PlayersManager from "./playersManager";
import { currentGameType } from "../propTypes";
import handleError from "../utils/handleError";

export const Board = props => {
  const { isActiveTurn } = props;
  const {
    selectedChecker,
    checkersPosition,
    nextMove,
    from
  } = props.currentGame;

  useEffect(
    () => {
      if (selectedChecker) {
        const { availablePoles } = getActivePoles(
          selectedChecker,
          checkersPosition,
          nextMove,
          from
        );
        props.setActivePoles(availablePoles);
      }
    }, //eslint-disable-next-line
    [selectedChecker]
  );

  useEffect(
    () => {
      props.selectGame(props.match.params.id);
      let gameSubscribe = () => {};
      try {
        gameSubscribe = firestore
          .collection("games")
          .doc(props.match.params.id)
          .onSnapshot(data => {
            props.setNewGameState(data.id, data.data());
          });
      } catch (error) {
        handleError(error);
      }

      return () => {
        props.clearCurrentGame();
        gameSubscribe();
      };
    }, //eslint-disable-next-line
    []
  );

  const renderBoard = () => {
    let rowComp = new Array(8).fill(1);
    let board = new Array(8).fill(1);
    board = board.map((item, row) => {
      return rowComp.map((item, col) => (
        <Pole
          isActiveTurn={isActiveTurn}
          col={col}
          row={row}
          key={`${row}/${col}`}
        />
      ));
    });
    return board;
  };

  return (
    <FlexContainer>
      <PlayersManager gameID={props.match.params.id} />
      <BoardContainer>{renderBoard()}</BoardContainer>
    </FlexContainer>
  );
};

const mapStateToProps = state => {
  return {
    currentGame: state.currentGame,
    isActiveTurn:
      state.currentGame.players.filter(
        ({ email, color }) =>
          email === state.user.email && color === state.currentGame.status
      ).length === 1
  };
};

Board.propTypes = {
  currentGame: currentGameType,
  selectGame: PropTypes.func,
  setNewGameState: PropTypes.func,
  setActivePoles: PropTypes.func,
  clearCurrentGame: PropTypes.func,
  isParticipant: PropTypes.bool
};

export default connect(
  mapStateToProps,
  { selectGame, setNewGameState, setActivePoles, clearCurrentGame }
)(Board);

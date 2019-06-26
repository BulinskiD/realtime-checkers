import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { BoardContainer, FlexContainer } from "../../styles/boardStyles";
import updatePlayersActiveState from "../../utils/updatePlayersActiveState";
import endGameAfterTimeout from "../../utils/endGameAfterTimeout";
import { firestore } from "../../api/firebase";
import { connect } from "react-redux";
import {
  setNewGameState,
  setActivePoles,
  selectGame,
  clearCurrentGame
} from "../../store/actions/checkers";
import getActivePoles from "../../utils/getActivePoles";
import Pole from "./pole";
import PlayersManager from "./playersManager";
import { currentGameType } from "../../propTypes";
import handleError from "../../utils/handleError";

export const Board = props => {
  const { isActiveTurn } = props;
  const {
    selectedChecker,
    checkersPosition,
    nextMove,
    players,
    status,
    from,
    updated
  } = props.currentGame;
  const [timeSinceMove, setTimeSinceMove] = useState(null);

  useEffect(
    () => {
      let inter;
      if (status === "black" || status === "white") {
        inter = setInterval(() => {
          const time = Math.ceil((Date.now() - updated) / 1000);
          if (updated) setTimeSinceMove(time);
          endGameAfterTimeout(
            time,
            status,
            players,
            props.match.params.id,
            inter
          );
        }, 1000);
      }

      return () => {
        clearInterval(inter);
      };
    }, //eslint-disable-next-line
    [updated, players, status]
  );

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
      let currentPlayers = [];
      props.selectGame(props.match.params.id);
      let gameSubscribe = () => {};
      try {
        gameSubscribe = firestore
          .collection("games")
          .doc(props.match.params.id)
          .onSnapshot(data => {
            if (data.data()) {
              props.setNewGameState(data.id, data.data());
              currentPlayers = data.data().players;
            }
          });
      } catch (error) {
        handleError(error);
      }

      return () => {
        props.clearCurrentGame();
        gameSubscribe();
        updatePlayersActiveState(
          currentPlayers,
          props.user.email,
          props.match.params.id,
          false
        );
      };
    }, //eslint-disable-next-line
    [props.user.email]
  );

  useEffect(
    () => {
      updatePlayersActiveState(
        players,
        props.user.email,
        props.match.params.id,
        true
      );
    }, //eslint-disable-next-line
    [players]
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
      <PlayersManager
        gameID={props.match.params.id}
        timeSinceMove={timeSinceMove}
        percentage={(timeSinceMove / 180) * 100}
        history={props.history}
      />
      <BoardContainer>{renderBoard()}</BoardContainer>
    </FlexContainer>
  );
};

const mapStateToProps = state => {
  return {
    currentGame: state.currentGame,
    user: state.user,
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

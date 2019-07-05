import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BLACK_WINNER, WHITE_WINNER } from "../../store/constants/actionTypes";
import leaveGame from "../../utils/leaveGame";
import Button from "react-bootstrap/Button";
import {
  ColumnFlexContainer,
  PlayerHolder,
  PlayerItem,
  PlayerHolderTitle,
  TimeIndicator
} from "../../styles/boardStyles";
import startGame from "../../utils/startGame";
import signUpToGame from "../../utils/signUpToGame";
import GameInfo from "./gameInfo";
import { currentGameType } from "../../propTypes";

export const PlayersManager = props => {
  const { status, players } = props.currentGame;

  return (
    <ColumnFlexContainer>
      <PlayerHolderTitle>Aktywni gracze</PlayerHolderTitle>
      <PlayerHolder>
        {players.map(item => {
          return (
            <PlayerItem
              active={item.color === props.currentGame.status}
              color={item.color}
              key={item.email}
            >
              {item.email}
            </PlayerItem>
          );
        })}
      </PlayerHolder>
      {props.canActivateGame &&
        (status === "not-started" ||
          status === WHITE_WINNER ||
          status === BLACK_WINNER) && (
          <Button
            className="start-game"
            onClick={() => startGame(props.currentGame, props.user)}
            variant="primary"
          >
            Zacznij grę
          </Button>
        )}
      {props.canLeaveGame && (
        <Button
          className="leave-game"
          onClick={() =>
            leaveGame(props.currentGame, props.user, props.history)
          }
          variant="warning"
        >
          Opuść grę!
        </Button>
      )}
      {props.gameAvailable && (
        <Button
          onClick={() => signUpToGame(props.user, props.gameID, players)}
          variant="primary"
        >
          Dołącz do gry
        </Button>
      )}
      <GameInfo status={status} />
      {(status === "black" || status === "white") && (
        <React.Fragment>
          <div>Czas do końca ruchu</div>
          <TimeIndicator percentage={props.percentage} />
        </React.Fragment>
      )}
    </ColumnFlexContainer>
  );
};

PlayersManager.propTypes = {
  currentGame: currentGameType,
  user: PropTypes.string,
  gameAvailable: PropTypes.bool,
  canActivateGame: PropTypes.bool,
  //From parent
  gameID: PropTypes.string
};

const mapStateToProps = state => {
  const { players, status } = state.currentGame;
  return {
    currentGame: state.currentGame,
    user: state.user.email,
    canActivateGame:
      players.length === 2 &&
      players.filter(item => item.email === state.user.email && !item.started)
        .length === 1,
    canLeaveGame:
      players.filter(item => item.email === state.user.email).length === 1 &&
      status !== "black" &&
      status !== "white",
    gameAvailable:
      players.length !== 2 &&
      players.filter(({ email }) => email === state.user.email).length === 0 &&
      !state.user.gameID
  };
};

export default connect(
  mapStateToProps,
  null
)(PlayersManager);

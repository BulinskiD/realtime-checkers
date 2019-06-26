import React from "react";
import { connect } from "react-redux";
import Checker from "./checker";
import { PoleContainer, ActivePlace } from "../../styles/boardStyles";
import { selectChecker, setActivePoles } from "../../store/actions/checkers";
import { firestore } from "../../api/firebase";
import {
  getPole,
  checkNextStatus,
  checkIfWinner
} from "../../utils/utilFunctions";
import moveChecker from "../../utils/moveChecker";
import handleError from "../../utils/handleError";
import { poleType } from "../../propTypes";

export const Pole = props => {
  const { selected, col, row, color, isKing } = props.pole ? props.pole : {};
  const { currentGame } = props;

  const handleMove = async () => {
    let oldFrom = {};
    // Save selectedChecker in oldForm
    Object.assign(oldFrom, props.currentGame.selectedChecker);

    const { checkersPosition, hasNextMove, selectedChecker } = moveChecker(
      currentGame.nextMove,
      currentGame.checkersPosition,
      currentGame.selectedChecker,
      { col: props.col, row: props.row }
    );
    let status = checkNextStatus(currentGame.status, hasNextMove);

    // If its last move of color, save old from as empty object
    if (!hasNextMove) oldFrom = {};

    const winner = checkIfWinner(checkersPosition, currentGame.status);
    if (winner) status = winner;

    try {
      await firestore
        .collection("games")
        .doc(currentGame.id)
        .update({
          status,
          checkersPosition,
          selectedChecker,
          nextMove: hasNextMove,
          from: oldFrom,
          updated: Date.now()
        });
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <PoleContainer col={props.col} row={props.row}>
      {props.pole && (
        <Checker
          isKing={isKing}
          isActiveTurn={props.isActiveTurn}
          selected={selected}
          col={col}
          row={row}
          color={color}
          status={props.currentGame.status}
        />
      )}
      {!props.pole && props.active && (
        <ActivePlace
          className="active"
          onClick={() => props.isActiveTurn && handleMove()}
        />
      )}
    </PoleContainer>
  );
};

const mapStateToProps = ({ currentGame }, ownProps) => {
  const { checkersPosition, activePoles } = currentGame;
  return {
    currentGame: currentGame,
    pole: getPole(ownProps.col, ownProps.row, checkersPosition),
    active:
      activePoles &&
      activePoles.filter(
        item => item.col === ownProps.col && item.row === ownProps.row
      ).length === 1
  };
};

Pole.propTypes = poleType;

export default connect(
  mapStateToProps,
  { selectChecker, setActivePoles }
)(Pole);

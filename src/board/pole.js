import React from 'react';
import {connect} from 'react-redux';
import Checker from './checker';
import PropTypes from 'prop-types';
import { PoleContainer, ActivePlace } from "./boardStyles";
import {selectChecker, setActivePoles} from "../store/actions/checkers";
import { firestore } from "../api/firebase";
import { getPole, checkNextStatus, checkIfWinner } from "../utils/utilFunctions";
import moveChecker from '../utils/moveChecker';
import handleError from '../utils/handleError';

export const Pole = props => {

    const {selected, col, row, color, isKing} = props.pole ? props.pole : {};

    const handleMove = async () => {
        let oldFrom = {};
        // Save selectedChecker in oldForm
        Object.assign(oldFrom, props.selectedChecker);

        const {checkersPosition, hasNextMove, selectedChecker} = moveChecker(props.nextMove, props.checkersPosition, props.selectedChecker, {col: props.col, row: props.row});
        let status = checkNextStatus(props.status, hasNextMove);

        // If its last move of color, save old from as empty object
        if(!hasNextMove)
            oldFrom = {};

        const winner = checkIfWinner(checkersPosition, props.status);
        if(winner)
            status = winner;

        try {
            await firestore.collection("games").doc(props.id)
                        .update({status, checkersPosition, selectedChecker, nextMove: hasNextMove, from: oldFrom });
        } catch (error) {
            handleError(error);
        }
    }

    return (
      <PoleContainer>
          {props.pole && <Checker isKing={isKing} selected={selected} col={col} row={row} color={color} status={props.status} />}
          {(!props.pole && props.active) && <ActivePlace className="active" onClick={handleMove} />}
      </PoleContainer>
    );
}

const mapStateToProps = ({currentGame} , ownProps) => {
    const {checkersPosition, activePoles, selectedChecker, id, status, nextMove} = currentGame;
    return {
        id: id,
        status: status,
        nextMove: nextMove,
        checkersPosition: checkersPosition,
        pole: getPole(ownProps.col, ownProps.row, checkersPosition),
        selectedChecker: selectedChecker,
        active: activePoles && activePoles.filter(item => item.col === ownProps.col && item.row ===ownProps.row).length === 1
    }
}

const checkersShape = PropTypes.shape({
    selected: PropTypes.bool,
    col: PropTypes.number,
    row: PropTypes.number,
    color: PropTypes.string});

Pole.propTypes = {
    id: PropTypes.string,
    status: PropTypes.string,
    nextMove: PropTypes.bool,
    checkersPosition: PropTypes.array,
    pole: checkersShape,
    active: PropTypes.bool,
    col: PropTypes.number,
    row: PropTypes.number,
    selectChecker: PropTypes.func,
    setActivePoles: PropTypes.func
}

export default connect(mapStateToProps, {selectChecker, setActivePoles})(Pole);
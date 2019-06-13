import React from 'react';
import {connect} from 'react-redux';
import Checker from './checker';
import { PoleContainer, ActivePlace } from "./boardStyles";
import {selectChecker, setActivePoles} from "../store/actions/checkers";
import { firestore } from "../api/firebase";
import { getPole, checkNextStatus } from "../utils/utilFunctions";
import moveChecker from '../utils/moveChecker';

const Pole = props => {

    const {selected, col, row, color} = props.pole ? props.pole : {};

    const handleMove = async () => {
        const {checkersPosition, hasNextMove, selectedChecker} = moveChecker(props.nextMove,
                                                                             props.checkersPosition,
                                                                             props.selectedChecker,
                                                                          {col: props.col, row: props.row});

        const status = checkNextStatus(props.status, hasNextMove);
        try {
            await firestore.collection("games").doc(props.id)
                        .update({status, checkersPosition, selectedChecker, nextMove: hasNextMove });
        } catch (error) {
            console.log(error);
        }
    }

    return (
      <PoleContainer>
          {props.pole && <Checker selected={selected} col={col} row={row} color={color} status={props.status} />}
          {(!props.pole && props.active) && <ActivePlace onClick={handleMove} />}
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

export default connect(mapStateToProps, {selectChecker, setActivePoles})(Pole);
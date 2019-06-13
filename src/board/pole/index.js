import React from 'react';
import {connect} from 'react-redux';
import Checker from '../checker';
import { PoleContainer, ActivePlace } from "./PolesStyles";
import {selectChecker, setActivePoles} from "../../store/actions/checkers";
import { firestore } from "../../api/firebase";
import getPole from '../../utils/getPole';
import moveChecker from '../../utils/moveChecker';

const Pole = props => {
    const handleMove = async () => {
        console.log(props.nextMove);
        const {checkersPosition, hasNextMove, selectedChecker} = moveChecker(props.nextMove, props.checkersPosition, props.selectedChecker,  {col: props.col, row: props.row});

        try {
            await firestore.collection("games").doc(props.id).update({
                status: checkNextStatus(props.status, hasNextMove),
                checkersPosition: checkersPosition,
                selectedChecker: selectedChecker,
                nextMove: hasNextMove
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
      <PoleContainer>
          {props.pole && props.pole.length !== 0 &&
          <Checker selected={props.pole[0].selected} col={props.pole[0].col} row={props.pole[0].row} color={props.pole[0].color} status={props.status} />}
          {(props.pole && props.active) && <ActivePlace onClick={handleMove} />}
      </PoleContainer>
    );
}

const checkNextStatus  = (status, hasNextMove) => {
    if((status === 'black' && hasNextMove) || (status === 'white' && !hasNextMove)) {
        return 'black';
    }

    return 'white';
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
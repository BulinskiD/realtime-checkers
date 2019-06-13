import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Checker from '../checker';
import {selectChecker, setActivePoles} from "../../store/actions/checkers";
import { firestore } from "../../api/firebase";
import getPole from '../../utils/getPole';
import moveChecker from '../../utils/moveChecker';
import getActivePoles from "../../utils/getActivePoles";

const Pole = props => {
    const PoleContainer = styled.div`
        border: solid 1px black;
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    const ActivePlace = styled.div`
        background-color: red;
        cursor: pointer;
        width: 100%;
        height: 100%;
    `;

    const checkNextStatus  = (status, hasNextMove) => {
        if(status === 'black' && hasNextMove) {
            return 'black';
        } else if (status ==='black' && !hasNextMove) {
            return 'white';
        } else if (status === 'white' && hasNextMove) {
            return 'white';
        } else if (status === 'white' && !hasNextMove) {
            return 'black';
        }
    }

    const handleMove = async () => {
        const {checkersPosition, hasNextMove, selectedChecker} = moveChecker(props.checkersPosition, props.selectedChecker,  {col: props.col, row: props.row});

        try {
            await firestore.collection("games").doc(props.id).update({
                status: checkNextStatus(props.status, hasNextMove),
                checkersPosition: checkersPosition,
                selectedChecker: selectedChecker
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

const mapStateToProps = ({currentGame} , ownProps) => {
    const {checkersPosition, activePoles, selectedChecker, id, status} = currentGame;
    return {
        id: id,
        status: status,
        checkersPosition: checkersPosition,
        pole: getPole(ownProps.col, ownProps.row, checkersPosition),
        selectedChecker: selectedChecker,
        active: activePoles && activePoles.filter(item => item.col === ownProps.col && item.row ===ownProps.row).length === 1
    }
}

export default connect(mapStateToProps, {selectChecker, setActivePoles})(Pole);
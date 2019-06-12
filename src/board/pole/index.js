import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Checker from '../checker';
import { firestore } from "../../api/firebase";
import getPole from '../../utils/getPole';
import moveChecker from '../../utils/moveChecker';

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

    const handleMove = async () => {
        try {
            await firestore.collection("games").doc(props.id).update({
                checkersPosition: moveChecker(props.checkersPosition, props.selectedChecker,  {col: props.col, row: props.row})
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
      <PoleContainer>
          {props.pole && props.pole.length !== 0 &&
          <Checker selected={props.pole[0].selected} col={props.pole[0].col} row={props.pole[0].row} color={props.pole[0].color} />}
          {props.active && <ActivePlace onClick={handleMove} />}
      </PoleContainer>
    );
}

const mapStateToProps = ({currentGame} , ownProps) => {
    const {checkersPosition, activePoles, selectedChecker, id} = currentGame;
    return {
        id: id,
        checkersPosition: checkersPosition,
        pole: getPole(ownProps.col, ownProps.row, checkersPosition),
        selectedChecker: selectedChecker,
        active: activePoles && activePoles.filter(item => item.col === ownProps.col && item.row ===ownProps.row).length === 1
    }
}

export default connect(mapStateToProps, null)(Pole);

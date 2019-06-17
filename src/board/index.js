import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { BoardContainer } from './boardStyles';
import Logout from '../auth/logout';
import Button from 'react-bootstrap/Button';
import {firestore} from "../api/firebase";
import { connect } from 'react-redux';
import { setNewGameState, setActivePoles, selectGame } from '../store/actions/checkers';
import startGame from '../utils/startGame';
import getActivePoles from '../utils/getActivePoles';
import Pole from './pole';

export const Board = props => {

    const {selectedChecker, checkersPosition, nextMove} = props.currentGame;

    useEffect(()=>{
        if(selectedChecker){
            const {availablePoles} = getActivePoles(selectedChecker, checkersPosition, nextMove);
            props.setActivePoles(availablePoles);
        }
    }, //eslint-disable-next-line
        [selectedChecker]);

    useEffect(()=>{
        props.selectGame(props.match.params.id);
        const gameSubscribe = firestore.collection("games").doc(props.match.params.id).onSnapshot(data => {
            props.setNewGameState(data.id, data.data());
        });

        return () => gameSubscribe();

        }, //eslint-disable-next-line
        []);

    const renderBoard = () => {
        let rowComp = new Array(8).fill(1);
        let board = new Array(8).fill(1);
        board = board.map((item, row) => {
            return rowComp.map((item, col)=> <Pole col={col} row={row} key={`${row}/${col}`} />);
        });
        return board;
    }

    return (
        <React.Fragment>
            <Logout />
            {props.currentGame.status === 'not-started' && <Button onClick={()=>startGame(props.currentGame)} variant='primary'>Zacznij grę</Button>}
            <BoardContainer>
                {renderBoard()}
            </BoardContainer>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        currentGame: state.currentGame
    }
}

Board.propTypes = {
    currentGame: PropTypes.shape({
        id: PropTypes.string,
        playerIds: PropTypes.object,
        status: PropTypes.string,
        nextMove: PropTypes.bool,
        checkersPosition: PropTypes.array,
        activePoles: PropTypes.array,
        selectedChecker: PropTypes.object
    }),
    selectGame: PropTypes.func,
    setNewGameState: PropTypes.func,
    setActivePoles: PropTypes.func
}

export default connect(mapStateToProps, {selectGame, setNewGameState, setActivePoles})(Board);

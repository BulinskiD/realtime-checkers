import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { BoardContainer } from './boardStyles';
import Logout from '../auth/logout';
import {firestore} from "../api/firebase";
import { connect } from 'react-redux';
import { setNewGameState, setActivePoles, selectGame, clearCurrentGame } from '../store/actions/checkers';
import getActivePoles from '../utils/getActivePoles';
import Pole from './pole';
import GameInfo from './gameInfo';
import {getMessage} from "../utils/utilFunctions";
import PlayersManager from './playersManager';
import {currentGameType} from "../propTypes";

export const Board = props => {

    const {selectedChecker, checkersPosition, nextMove, from, status} = props.currentGame;
    const [message, setMessage] = useState({text: '', isEnded: false});

    useEffect(()=>{
        if(selectedChecker){
            const {availablePoles} = getActivePoles(selectedChecker, checkersPosition, nextMove, from);
            props.setActivePoles(availablePoles);
        }
    }, //eslint-disable-next-line
        [selectedChecker]);

    useEffect(()=>{
        setMessage(getMessage(status));
    }, [status]);

    useEffect(()=>{
        props.selectGame(props.match.params.id);
        const gameSubscribe = firestore.collection("games").doc(props.match.params.id).onSnapshot(data => {
            props.setNewGameState(data.id, data.data());
        });

        return () => {
            props.clearCurrentGame();
            gameSubscribe();
        }

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
            <GameInfo message={message.text} isEnded={message.isEnded} />
            <Logout />
            <PlayersManager gameID={props.match.params.id} />
            <BoardContainer>
                {renderBoard()}
            </BoardContainer>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        currentGame: state.currentGame,
    }
}

Board.propTypes = {
    currentGame: currentGameType,
    selectGame: PropTypes.func,
    setNewGameState: PropTypes.func,
    setActivePoles: PropTypes.func,
    clearCurrentGame: PropTypes.func
}

export default connect(mapStateToProps, {selectGame, setNewGameState, setActivePoles, clearCurrentGame})(Board);

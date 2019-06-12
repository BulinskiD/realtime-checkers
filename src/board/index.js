import React, {useEffect} from 'react';
import styled from 'styled-components';
import Logout from '../auth/logout';
import Button from 'react-bootstrap/Button';
import Pole from './pole';
import {firestore} from "../api/firebase";
import { connect } from 'react-redux';
import { setNewGameState, setActivePoles } from '../store/actions/checkers';
import { selectGame } from '../store/actions/games';
import startGame from '../utils/startGame';
import getActivePoles from '../utils/getActivePoles';

const Board = props => {

    const BoardContainer = styled.div`
        margin: 0 auto;
        height: 90vh;
        width: 90vh;
        display: grid;
        grid-auto-flow: row;
        grid-template-columns: 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5%;
        grid-template-rows: 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5%;
        justify-items: stretch;
    `;

    const {selectedChecker} = props.currentGame;

    useEffect(()=>{
        if(selectedChecker){
            props.setActivePoles(getActivePoles(selectedChecker));
        }

    }, //eslint-disable-next-line
        [selectedChecker]);

    useEffect(()=>{
        props.selectGame(props.match.params.id);
        const gameSubscribe = firestore.collection("games").doc(props.match.params.id).onSnapshot(data => {
            props.setNewGameState(data.id, data.data());
        });

        return ()=> gameSubscribe();

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
            {props.currentGame.status !== 'started' && <Button onClick={()=>startGame(props.currentGame)} variant='primary'>Zacznij grę</Button>}
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

export default connect(mapStateToProps, {selectGame, setNewGameState, setActivePoles})(Board);

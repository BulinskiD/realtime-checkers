import React, {useEffect} from 'react';
import styled from 'styled-components';
import Logout from '../auth/logout';
import Button from 'react-bootstrap/Button';
import Pole from './pole';
import { connect } from 'react-redux';
import { startGame } from '../store/actions/checkers';

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
            {props.status !== 'started' && <Button onClick={()=>props.startGame(props.match.params.id)} variant='primary'>Zacznij grę</Button>}
            <BoardContainer>
                {renderBoard()}
            </BoardContainer>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        status: state.currentGame.gameState.status
    }
}
export default connect(mapStateToProps, {startGame})(Board);

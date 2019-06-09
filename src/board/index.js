import React from 'react';
import styled from 'styled-components';
import Logout from '../auth/logout';
import Pole from './pole/';

const Board = () => {

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
            <BoardContainer>
                {renderBoard()}
            </BoardContainer>
        </React.Fragment>
    );
}


export default Board;

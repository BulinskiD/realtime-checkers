import React from 'react';
import styled from 'styled-components';

import Pole from './pole';

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
        let rowComp = new Array(8);
        const board = new Array(8);
        for(let row = 0; row < 8; row++) {
            for(let col = 0; col < 8; col++) {
              rowComp[col] = <Pole x={row} y={col} key={`${row}/${col}`} />
            }
            board[row] = rowComp;
            rowComp = new Array(8);
        }
        return board;
    }


    return (
        <BoardContainer>
            {renderBoard()}
        </BoardContainer>
    );
}


export default Board;

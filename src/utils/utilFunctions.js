import {BLACK_WINNER, WHITE_WINNER} from "../store/constants/actionTypes";

export const getPole = (col, row, position) => {
    let pole;
    if(position) {
        pole = position.filter(item => (item.col === col && item.row === row));
        if(pole.length > 0) {
            return pole[0];
        }
    }

    return null;
}


export const checkNextStatus  = (status, hasNextMove) => {
    if((status === 'black' && hasNextMove) || (status === 'white' && !hasNextMove)) {
        return 'black';
    }
    return 'white';
}

export const checkIfWinner = (checkersPosition, status) => {
        const winner = status === 'black' ? BLACK_WINNER : WHITE_WINNER;
        const color = status === 'black' ? 'white' : 'black';
        const coloredCheckers = checkersPosition.filter(item => item.color === color);
        return coloredCheckers.length === 0 ? winner : null;
}
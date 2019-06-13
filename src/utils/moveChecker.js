import getActivePoles from "./getActivePoles";

export default (checkersPosition, from, to) => {

    let row = from.color === 'black' ? from.row - 1 : from.row + 1;

    let selectedChecker = null;

    let hasNextMove = false;

    if((from.col - to.col) === 2) {
        hasNextMove = true;
        checkersPosition = checkersPosition.filter(item => {
            if((from.col - 1 === item.col) && (row === item.row)) {
                return item.color === from.color;
            }
            return true;
        });
    }

    if((from.col - to.col) === -2) {
        hasNextMove = true;
        checkersPosition = checkersPosition.filter(item => {
            if((from.col + 1 === item.col) && (row === item.row)) {
                return item.color === from.color;
            }
            return true;
        });
    }

    const indexOfChecker = checkersPosition.indexOf(checkersPosition.filter(item => item.col === from.col && item.row === from.row)[0]);

    if(hasNextMove) {
        const selected = { col: to.col, row: to.row, color: from.color };
        if (getActivePoles(selected, checkersPosition).length === 0) {
            hasNextMove = false;
            checkersPosition[indexOfChecker].selected = false;
        } else {
            selectedChecker = selected;
        }
    } else {
        checkersPosition[indexOfChecker].selected = false;
    }

    checkersPosition[indexOfChecker].col = to.col;
    checkersPosition[indexOfChecker].row = to.row;


    return {checkersPosition, hasNextMove, selectedChecker};
}
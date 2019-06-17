import getActivePoles from "./getActivePoles";

export default (isNextMove, checkersPosition, from, to) => {

    let row = from.row - to.row > 0 ? from.row - 1 : from.row + 1;

    let selectedChecker = null;

    let hasNextMove = false;

    if((from.col - to.col) === 2) {
        hasNextMove = true;
        //Check if move kills opponent
        checkersPosition = checkersPosition.filter(item => {
            if((from.col - 1 === item.col) && (row === item.row)) {
                return item.color === from.color;
            }
            return true;
        });
    }

    if((from.col - to.col) === -2) {
        hasNextMove = true;
        //Check if move kills opponent
        checkersPosition = checkersPosition.filter(item => {
            if((from.col + 1 === item.col) && (row === item.row)) {
                return item.color === from.color;
            }
            return true;
        });
    }

    //Check position of checker
    const indexOfChecker = checkersPosition.indexOf(checkersPosition.filter(item => item.col === from.col && item.row === from.row)[0]);

    if((to.row === 7 && from.color === 'white') || (to.row === 0 && from.color === 'black')) {
        checkersPosition[indexOfChecker].isKing = true;
    }

    if(hasNextMove) {
        const selected = { col: to.col, row: to.row, color: from.color, isKing: checkersPosition[indexOfChecker].isKing };
        let {availablePoles, containsDoubleMove} = getActivePoles(selected, checkersPosition, isNextMove, from);

        if (availablePoles.length !== 0 && containsDoubleMove) {
            selectedChecker = selected;
            if((to.row === 7 && from.color === 'white') || (to.row === 0 && from.color === 'black'))
                selectedChecker.isKing = true;
        } else {
            hasNextMove = false;
            checkersPosition[indexOfChecker].selected = false;
        }

    } else {
        checkersPosition[indexOfChecker].selected = false;
    }

    checkersPosition[indexOfChecker].col = to.col;
    checkersPosition[indexOfChecker].row = to.row;


    return {checkersPosition, hasNextMove, selectedChecker};
}
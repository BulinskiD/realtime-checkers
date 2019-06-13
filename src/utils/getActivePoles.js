export default (selectedChecker, checkersPosition, isNextMove = false) => {

    const {col, row, color} = selectedChecker;
    let availablePoles = [];
    let containsDoubleMove = false;
    let doubleMove = [];
    let singleMove = [];

    //Prepare data
    const { availableRow, nextAvailableRow } = getAvailableRows(color, row);

    let oneToRight = filterArrayToGetPole(checkersPosition, col, availableRow, 1);
    let twoToRight = filterArrayToGetPole(checkersPosition, col, nextAvailableRow, 2);

    let oneToLeft = filterArrayToGetPole(checkersPosition, col, availableRow, -1);
    let twoToLeft = filterArrayToGetPole(checkersPosition, col, nextAvailableRow, -2);

    //Check right side of checker
    if(oneToRight.length === 0) {
        singleMove.push({col: col + 1, row: availableRow});
    }
    else if(twoToRight.length === 0) {
        if(col + 2 <= 7 && (nextAvailableRow >= 0 && nextAvailableRow <= 7)) {
            doubleMove.push({col: col + 2, row: nextAvailableRow});
            containsDoubleMove = true;
        }
    }

    //Check left side of checker
    if(oneToLeft.length === 0) {
        singleMove.push({col: col - 1, row: availableRow});
    }
    else if(twoToLeft.length === 0) {
        if(col - 2 >= 0 && (nextAvailableRow >= 0 && nextAvailableRow <= 7)) {
            doubleMove.push({col: col - 2, row: nextAvailableRow});
            containsDoubleMove = true;
        }
    }

    //TODO Check which side can checker move
    if(doubleMove.length > 0) {
        console.log(isNextMove);
        if(isNextMove) {
            availablePoles = doubleMove;
        } else {
            availablePoles = [...doubleMove, ...singleMove];
        }
    } else {
        availablePoles = [...singleMove];
    }

    //Filter items out of range (board 8x8)
    availablePoles = availablePoles.filter(item => (item.col >= 0 && item.col <= 7) && (item.row >= 0 && item.row <= 7));

    return {availablePoles, containsDoubleMove};
}



const getAvailableRows = (color, row) => {
    let availableRow = 0;
    let nextAvailableRow = 0;

    if(color === 'black') {
        availableRow = row - 1;
        nextAvailableRow = row -2;
    } else {
        availableRow = row + 1;
        nextAvailableRow = row +2;
    }

    return {availableRow, nextAvailableRow};
}

const filterArrayToGetPole = (checkersPosition, col, availableRow, side) => {
    return checkersPosition.filter(item => item.col === col + side && item.row === availableRow);
}
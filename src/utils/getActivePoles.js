export default (selectedChecker, checkersPosition, isNextMove = false) => {

    const {col, row, color, isKing} = selectedChecker;
    let availablePoles = [];

    /**** Prepare data ****/
    const [ availableRow, nextAvailableRow ] = getAvailableRows(color, row);
    const arrays = getPolesAround(checkersPosition, col, availableRow, nextAvailableRow);
    let [ containsDoubleMove, singleMove, doubleMove ] = checkLeftAndRight(arrays, availableRow, nextAvailableRow, col);

    /**** Additional opportunities for king ****/
    if (isKing) {

        const invertedColor = color === 'black' ? 'white' : 'black';
        const [kingRow, nextKingRow] = getAvailableRows(invertedColor, row);
        const kingsArrays = getPolesAround(checkersPosition, col, kingRow, nextKingRow);
        const [containsKingsDoubleMove, kingSingleMove, kingDoubleMove] = checkLeftAndRight(kingsArrays, kingRow, nextKingRow, col);

        containsDoubleMove = containsKingsDoubleMove || containsDoubleMove;
        doubleMove = [...doubleMove, ...kingDoubleMove];
        singleMove = [...singleMove, ...kingSingleMove];
        console.log(containsKingsDoubleMove, kingDoubleMove, kingSingleMove);
    }

    if(doubleMove.length > 0) {
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


/**** Helper methods ****/
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

        return [ availableRow, nextAvailableRow ];
}

const filterArrayToGetPole = (checkersPosition, col, availableRow, side) => {
    return checkersPosition.filter(item => item.col === col + side && item.row === availableRow);
}

const checkLeftAndRight = (arrays, availableRow, nextAvailableRow, col) => {

    const {oneToRight, twoToRight, oneToLeft, twoToLeft} = arrays;
    let singleMove = [];
    let doubleMove = [];
    let containsDoubleMove = false;
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
    return [containsDoubleMove, singleMove, doubleMove];
}

const getPolesAround = (checkersPosition, col, availableRow, nextAvailableRow) => {

    const oneToRight = filterArrayToGetPole(checkersPosition, col, availableRow, 1);
    const twoToRight = filterArrayToGetPole(checkersPosition, col, nextAvailableRow, 2);

    const oneToLeft = filterArrayToGetPole(checkersPosition, col, availableRow, -1);
    const twoToLeft = filterArrayToGetPole(checkersPosition, col, nextAvailableRow, -2);

    return {oneToRight, twoToRight, oneToLeft, twoToLeft};
}
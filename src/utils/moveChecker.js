import getActivePoles from "./getActivePoles";

export default (isNextMove, checkersPosition, from, to) => {

    let row = from.color === 'black' ? from.row - 1 : from.row + 1;

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

    const indexOfChecker = checkersPosition.indexOf(checkersPosition.filter(item => item.col === from.col && item.row === from.row)[0]);

    if(hasNextMove) {
        const selected = { col: to.col, row: to.row, color: from.color };
        const {availablePoles, containsDoubleMove} = getActivePoles(selected, checkersPosition, isNextMove);
        if (availablePoles.length !== 0 && containsDoubleMove) {
            selectedChecker = selected;
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


// TODO pull helper functions outside the main function
// const checkToTheLeft = (item, from, to) => {
//     if((from.col - to.col) === 2) {
//         hasNextMove = true;
//         checkersPosition = checkersPosition.filter(item => {
//             if((from.col - 1 === item.col) && (row === item.row)) {
//                 return item.color === from.color;
//             }
//             return true;
//         });
//     }
// }

// const checkToTheRight = () => {
//
// }
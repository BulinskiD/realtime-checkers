export default (checkersPosition, from, to) => {

    let row = from.color === 'black' ? from.row - 1 : from.row + 1;


    if((from.col - to.col) === 2) {
        checkersPosition = checkersPosition.filter(item => {
            if((from.col - 1 === item.col) && (row === item.row)) {
                return item.color === from.color;
            }
            return true;
        });
    }

    if((from.col - to.col) === -2) {
        checkersPosition = checkersPosition.filter(item => {
            if((from.col + 1 === item.col) && (row === item.row)) {
                return item.color === from.color;
            }
            return true;
        });
    }



    checkersPosition[checkersPosition.indexOf(from)].col = to.col;
    checkersPosition[checkersPosition.indexOf(from)].row = to.row;
    checkersPosition[checkersPosition.indexOf(from)].selected = false;

    return checkersPosition;
}
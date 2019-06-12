export default (checkersPosition, from, to) => {
    checkersPosition[checkersPosition.indexOf(from)].col = to.col;
    checkersPosition[checkersPosition.indexOf(from)].row = to.row;
    checkersPosition[checkersPosition.indexOf(from)].selected = false;

    return checkersPosition;
}
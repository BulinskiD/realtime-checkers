//TODO
export default selectedChecker => {
    const {col, row} = selectedChecker;
    const availablePoles = [];
    let availableRow;

    if(selectedChecker.color === 'black') {
        availableRow = row - 1;
    } else {
        availableRow = row + 1;
    }

    if(row > 0 && row < 7 && col > 0 && col < 7) {
        availablePoles.push({col: col+1, row: availableRow});
        availablePoles.push({col: col-1, row: availableRow});
    }

    return availablePoles;
}
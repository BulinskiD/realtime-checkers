export default (selectedChecker, checkersPosition) => {
    const {col, row, color} = selectedChecker;
    const availablePoles = [];
    let availableRow;
    let nextAvailableRow;

    if(color === 'black') {
        availableRow = row - 1;
        nextAvailableRow = row -2;
    } else {
        availableRow = row + 1;
        nextAvailableRow = row +2;
    }

    if(checkersPosition.filter(item => item.col === col + 1 && item.row === availableRow).length === 0)
        availablePoles.push({col: col+1, row: availableRow});
    else if(checkersPosition.filter(item => item.col === col + 2 && item.row === nextAvailableRow).length === 0)
        availablePoles.push({col: col+2, row: nextAvailableRow});

    if(checkersPosition.filter(item => item.col === col - 1 && item.row === availableRow).length === 0)
        availablePoles.push({col: col-1, row: availableRow});
    else if(checkersPosition.filter(item => item.col === col - 2 && item.row === nextAvailableRow).length === 0)
        availablePoles.push({col: col-2, row: nextAvailableRow});

    return availablePoles;
}
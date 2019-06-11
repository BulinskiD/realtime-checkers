export default (col, row, currentGame) => {
    let pole;
    if(currentGame && currentGame.checkersPosition)
        pole = currentGame.checkersPosition.filter(item => (item.col === col && item.row === row));

    return pole;
}
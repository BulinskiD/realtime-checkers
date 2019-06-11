export default (col, row, currentGame) => {
    let pole;
    if(currentGame && currentGame.gameState.checkersPosition)
        pole = currentGame.gameState.checkersPosition.filter(item => (item.col === col && item.row === row));

    return pole;
}
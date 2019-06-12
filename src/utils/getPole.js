export default (col, row, position) => {
    let pole;
    if(position)
        pole = position.filter(item => (item.col === col && item.row === row));

    return pole;
}
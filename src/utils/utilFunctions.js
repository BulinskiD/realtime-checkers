export const getPole = (col, row, position) => {
    let pole;
    if(position) {
        pole = position.filter(item => (item.col === col && item.row === row));
        if(pole.length > 0) {
            return pole[0];
        }
    }

    return null;
}


export const checkNextStatus  = (status, hasNextMove) => {
    if((status === 'black' && hasNextMove) || (status === 'white' && !hasNextMove)) {
        return 'black';
    }
    return 'white';
}
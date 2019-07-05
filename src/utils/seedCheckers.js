export default () => {
  let rowComp = new Array(8).fill(1);
  let board = new Array(8).fill(1);

  board = board.map((item, row) => {
    return rowComp.map((item, col) => {
      let color;
      if (col % 2 === row % 2) {
        if (row <= 2) color = "white";
        else if (row >= 5) color = "black";
      }

      if (color) return { col, row, color, selected: false, isKing: false };
      else return null;
    });
  });

  board = board.map(row => row.filter(Boolean)).flat();

  return board;
};

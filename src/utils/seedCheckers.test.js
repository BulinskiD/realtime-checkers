import seedCheckers from "./seedCheckers";

describe("seedCheckers", () => {
  it("should return correct board", () => {
    const board = seedCheckers();
    expect(board.length).toBe(24);
    expect(board.filter(item => item.color === "white").length).toBe(12);
    expect(board.filter(item => item.color === "black").length).toBe(12);
  });
});

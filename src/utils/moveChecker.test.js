import moveChecker from "./moveChecker";
import getActivePoles from "./getActivePoles";

jest.mock("./getActivePoles");

describe("MoveChecker", () => {
  beforeEach(() => {
    getActivePoles.mockClear();
  });

  it("should change col and row in checkersPostion from from to to", () => {
    const isNextMove = false;
    const oldCheckersPosition = [{ col: 2, row: 2, selected: false }];
    const from = { col: 2, row: 2, selected: false };
    const to = { col: 3, row: 3, selected: false };

    expect.assertions(4);
    const { checkersPosition, hasNextMove, selectedChecker } = moveChecker(
      isNextMove,
      oldCheckersPosition,
      from,
      to
    );

    expect(checkersPosition).toEqual(expect.arrayContaining([to]));
    expect(hasNextMove).toBeFalsy();
    expect(selectedChecker).toBe(null);
    expect(getActivePoles).toBeCalledTimes(0);
  });

  it("should change col and row in checkersPostion from from to to, select item and return hasNextMove === false for given input", () => {
    const isNextMove = false;
    const oldCheckersPosition = [
      { col: 2, row: 2, selected: true, color: "black", isKing: false }
    ];
    const from = {
      col: 2,
      row: 2,
      selected: false,
      color: "black",
      isKing: false
    };
    const to = {
      col: 4,
      row: 4,
      selected: false,
      color: "black",
      isKing: false
    };

    getActivePoles.mockReturnValue({
      availablePoles: [],
      containsDoubleMove: false
    });

    expect.assertions(4);
    const { checkersPosition, hasNextMove, selectedChecker } = moveChecker(
      isNextMove,
      oldCheckersPosition,
      from,
      to
    );

    expect(checkersPosition).toEqual(expect.arrayContaining([to]));
    expect(hasNextMove).toBeFalsy();
    expect(selectedChecker).toStrictEqual(null);
    expect(getActivePoles).toBeCalledTimes(1);
  });

  it("should remove checker {col: 3, row: 3} from array for given input", () => {
    const isNextMove = false;
    const oldCheckersPosition = [
      { col: 2, row: 2, selected: true, color: "white", isKing: false },
      { col: 3, row: 3, selected: false, color: "black", isKing: false }
    ];
    const from = {
      col: 2,
      row: 2,
      selected: false,
      color: "white",
      isKing: false
    };
    const to = { col: 4, row: 4 };

    getActivePoles.mockReturnValue({
      availablePoles: [],
      containsDoubleMove: true
    });

    expect.assertions(4);
    const { checkersPosition, hasNextMove, selectedChecker } = moveChecker(
      isNextMove,
      oldCheckersPosition,
      from,
      to
    );

    expect(checkersPosition).toEqual(
      expect.arrayContaining([oldCheckersPosition[0]])
    );
    expect(hasNextMove).toBeFalsy();
    expect(selectedChecker).toStrictEqual(null);
    expect(getActivePoles).toBeCalledTimes(1);
  });

  it("should not remove checker {col: 3, row: 3} from array for given input", () => {
    const isNextMove = false;
    const oldCheckersPosition = [
      { col: 2, row: 2, selected: true, color: "white", isKing: false },
      { col: 3, row: 3, selected: false, color: "white", isKing: false }
    ];
    const expectedState = [
      { col: 4, color: "white", isKing: false, row: 4, selected: false },
      { col: 3, color: "white", isKing: false, row: 3, selected: false }
    ];
    const from = {
      col: 2,
      row: 2,
      selected: false,
      color: "white",
      isKing: false
    };
    const to = { col: 4, row: 4 };

    getActivePoles.mockReturnValue({
      availablePoles: [],
      containsDoubleMove: true
    });

    expect.assertions(4);
    const { checkersPosition, hasNextMove, selectedChecker } = moveChecker(
      isNextMove,
      oldCheckersPosition,
      from,
      to
    );

    expect(checkersPosition).toEqual(expect.arrayContaining(expectedState));
    expect(hasNextMove).toBeFalsy();
    expect(selectedChecker).toStrictEqual(null);
    expect(getActivePoles).toBeCalledTimes(1);
  });

  it("should return hasNextMove === true, remove white checker from array, and set isKing to true", () => {
    const isNextMove = false;
    const oldCheckersPosition = [
      { col: 2, row: 2, selected: true, color: "black", isKing: false },
      { col: 1, row: 1, selected: false, color: "white", isKing: false }
    ];
    const expectedState = [
      { col: 0, color: "black", isKing: true, row: 0, selected: true }
    ];
    const from = {
      col: 2,
      row: 2,
      selected: false,
      color: "black",
      isKing: false
    };
    const to = { col: 0, row: 0 };

    getActivePoles.mockReturnValue({
      availablePoles: [{ col: 1, row: 1, color: "black" }],
      containsDoubleMove: true
    });

    expect.assertions(4);
    const { checkersPosition, hasNextMove, selectedChecker } = moveChecker(
      isNextMove,
      oldCheckersPosition,
      from,
      to
    );

    expect(checkersPosition).toEqual(expect.arrayContaining(expectedState));
    expect(hasNextMove).toBeTruthy();
    expect(selectedChecker).toStrictEqual({
      col: 0,
      row: 0,
      color: "black",
      isKing: true
    });
    expect(getActivePoles).toBeCalledTimes(1);
  });

  it("should return hasNextMove === true, and selectedChecker === from with changed col and row for given input", () => {
    const isNextMove = false;
    const oldCheckersPosition = [
      { col: 2, row: 2, selected: true, color: "white", isKing: false },
      { col: 3, row: 3, selected: false, color: "white", isKing: false }
    ];
    const expectedState = [
      { col: 4, color: "white", isKing: false, row: 4, selected: true },
      { col: 3, color: "white", isKing: false, row: 3, selected: false }
    ];
    const from = {
      col: 2,
      row: 2,
      selected: false,
      color: "white",
      isKing: false
    };
    const to = { col: 4, row: 4 };

    getActivePoles.mockReturnValue({
      availablePoles: [{ col: 5, row: 5, color: "black" }],
      containsDoubleMove: true
    });

    expect.assertions(4);
    const { checkersPosition, hasNextMove, selectedChecker } = moveChecker(
      isNextMove,
      oldCheckersPosition,
      from,
      to
    );

    expect(checkersPosition).toEqual(expect.arrayContaining(expectedState));
    expect(hasNextMove).toBeTruthy();
    expect(selectedChecker).toStrictEqual({
      col: 4,
      row: 4,
      color: "white",
      isKing: false
    });
    expect(getActivePoles).toBeCalledTimes(1);
  });
});

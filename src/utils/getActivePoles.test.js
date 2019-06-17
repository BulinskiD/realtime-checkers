import getActivePoles from './getActivePoles';

const selectedChecker = {col: 1, row: 1, color: 'white', selected: false, isKing: false}

describe('GetActivePoles', ()=>{
    it('should return two available poles: {col:0, row: 2}, {col:2, row:2} and containsDoubleMove === false for given input', () => {
        const checkersPosition = [];
        const expectedState = [{col: 2, row: 2}, {col: 0, row: 2}]

        expect.assertions(3);

        const {containsDoubleMove, availablePoles} = getActivePoles(selectedChecker, checkersPosition);

        expect(containsDoubleMove).toBe(false);
        expect(availablePoles.length).toBe(2);
        expect(availablePoles).toEqual(expect.arrayContaining(expectedState));
    });

    it('should return one available pole: {col:2, row:2} and containsDoubleMove === false for given input', () => {
        const checkersPosition = [{col: 0, row: 2}];
        const expectedState = [{col: 2, row: 2}]

        expect.assertions(3);

        const {containsDoubleMove, availablePoles} = getActivePoles(selectedChecker, checkersPosition);

        expect(containsDoubleMove).toBe(false);
        expect(availablePoles.length).toBe(1);
        expect(availablePoles).toEqual(expect.arrayContaining(expectedState));
    });

    it('should return none available poles and containsDoubleMove === false for given input', () => {
        const checkersPosition = [{col: 0, row: 2}, {col: 2, row: 2}, {col: 3, row: 3}];

        expect.assertions(2);

        const {containsDoubleMove, availablePoles} = getActivePoles(selectedChecker, checkersPosition);

        expect(containsDoubleMove).toBe(false);
        expect(availablePoles.length).toBe(0);
    });

    it('should return one available pole {col:3, row: 3} and containsDoubleMove === true for given input', () => {
        const checkersPosition = [{col: 0, row: 2}, {col: 2, row: 2}];
        const expectedState = [{col: 3, row: 3}];

        expect.assertions(3);

        const {containsDoubleMove, availablePoles} = getActivePoles(selectedChecker, checkersPosition);

        expect(containsDoubleMove).toBe(true);
        expect(availablePoles.length).toBe(1);
        expect(availablePoles).toEqual(expect.arrayContaining(expectedState));
    });

    it('should return empty array when checker is at edge of board, and is not a king', () => {
        const checker = {col: 7, row: 7, color: 'white', selected: false, isKing: false}

        expect.assertions(2);

        const {containsDoubleMove, availablePoles} = getActivePoles(checker, []);

        expect(containsDoubleMove).toBe(false);
        expect(availablePoles.length).toBe(0);
    });

    it('should return {col:6, row:6} array when checker is at edge of board, and is a king', () => {
        const checker = {col: 7, row: 7, color: 'white', selected: false, isKing: true}
        const expectedState = [{col: 6, row: 6}];
        expect.assertions(3);

        const {containsDoubleMove, availablePoles} = getActivePoles(checker, []);

        expect(containsDoubleMove).toBe(false);
        expect(availablePoles.length).toBe(1);
        expect(availablePoles).toEqual(expect.arrayContaining(expectedState));
    });

    it('should return {col:5, row:5} array and containsDoubleMove=true when checker is at edge of board, and is a king, for given input', () => {
        const checker = {col: 7, row: 7, color: 'white', selected: false, isKing: true};
        const checkersPosition = [{col: 6, row: 6}];

        const expectedState = [{col: 5, row: 5}];
        expect.assertions(3);

        const {containsDoubleMove, availablePoles} = getActivePoles(checker, checkersPosition);

        expect(containsDoubleMove).toBe(true);
        expect(availablePoles.length).toBe(1);
        expect(availablePoles).toEqual(expect.arrayContaining(expectedState));
    });

    it('should return only double moves when isNextMove === true', () => {
        const checkersPosition = [{col: 2, row: 2}];
        const expectedState = [{col: 3, row: 3}]

        expect.assertions(3);

        const {containsDoubleMove, availablePoles} = getActivePoles(selectedChecker, checkersPosition, true);

        expect(containsDoubleMove).toBe(true);
        expect(availablePoles.length).toBe(1);
        expect(availablePoles).toEqual(expect.arrayContaining(expectedState));
    });

    it('should not display from object on availablePoles', () => {
        const checkersPosition = [{col: 2, row: 2}, {col: 3, row: 3}, {col: 1, row: 3}, {col: 3, row: 1}, {col: 1, row: 1}, {col: 2, row: 0}, {col: 0, row: 0}];
        const from = {col: 0, row: 2};
        const king = {col: 1, row: 1, color: 'white', selected: false, isKing: true};

        const {availablePoles} = getActivePoles(king, checkersPosition, false, from);

        expect(availablePoles).toStrictEqual([]);
    });
});

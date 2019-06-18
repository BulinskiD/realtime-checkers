import {getPole, checkNextStatus, checkIfWinner} from './utilFunctions';
import {BLACK_WINNER, WHITE_WINNER} from "../store/constants/actionTypes";

describe("GetPole", () => {

   it('should return the object for given col and row', () => {
       const position = [{col: 2, row: 2}];
       const col = 2;
       const row = 2;
       const pole = getPole(col, row, position);
       expect(pole).toStrictEqual({col:2, row: 2});
   });

   it('should return null when object is not in the array', () => {
       const position = [{col: 2, row: 2}];
       const col = 3;
       const row = 2;
       const pole = getPole(col, row, position);
       expect(pole).toBe(null);
   });

});

describe("CheckNextStatus", () => {

    it('should return the input color when hasNextMove === true', () => {
        const hasNextMove = true;
        const status = 'black';
        const newStatus = checkNextStatus(status, hasNextMove);
        expect(newStatus).toBe(status);
    });

    it('should return inverted color when hasNextMove === false', () => {
        const hasNextMove = false;
        const status = 'black';
        const newStatus = checkNextStatus(status, hasNextMove);
        expect(newStatus).toBe('white');
    });

});

describe("Check if winner", () => {

    it("should return 'white' for given input", () => {
        const checkersPosition = [{col: 1, row: 1, color: 'white'}];
        const status = 'white';

        expect(checkIfWinner(checkersPosition, status)).toBe(WHITE_WINNER);
    });

    it("should return 'black' for given input", () => {
        const checkersPosition = [{col: 1, row: 1, color: 'black'}];
        const status = 'black';

        expect(checkIfWinner(checkersPosition, status)).toBe(BLACK_WINNER);
    });

    it("should return null for given input", () => {
        const checkersPosition = [{col: 1, row: 1, color: 'black'}, {col:2, row: 2, color: 'white'}];
        const status = 'black';

        expect(checkIfWinner(checkersPosition, status)).toBe(null);
    });
});
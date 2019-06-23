import {getPole, checkNextStatus, checkIfWinner, getMessage, getErrorMessage} from './utilFunctions';
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

describe("CheckIfWinner", () => {

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

describe("getMessage", () => {

    it("should return correct message for white status", () => {
        const messageExpected = {text: "Grają białe", isEnded: false};
        const status = 'white';

        expect(getMessage(status)).toStrictEqual(messageExpected);
    });

    it("should return correct message for black status", () => {
        const messageExpected = {text: "Grają czarne", isEnded: false};
        const status = 'black';

        expect(getMessage(status)).toStrictEqual(messageExpected);
    });

    it("should return correct message for white-winner status", () => {
        const messageExpected = {text: "Wygrały białe", isEnded: true};
        const status = WHITE_WINNER;

        expect(getMessage(status)).toStrictEqual(messageExpected);
    });

    it("should return correct message for white status", () => {
        const messageExpected = {text: "Wygrały czarne", isEnded: true};
        const status = BLACK_WINNER;

        expect(getMessage(status)).toStrictEqual(messageExpected);
    });
    it("should return correct message for default status", () => {
        const messageExpected = {text: "", isEnded: false};
        const status = 'test';

        expect(getMessage(status)).toStrictEqual(messageExpected);
    });
});

describe('getErrorMessage', () => {
    const error = {code: ''};
   it('should return correct message for auth/wrong-password', () => {
       error.code = "auth/wrong-password";
       expect(getErrorMessage(error)).toBe("Błędne hasło!");
   });

    it('should return correct message for auth/invalid-email', () => {
        error.code = "auth/invalid-email";
        expect(getErrorMessage(error)).toBe("Niepoprawny adres email!");
    });

    it('should return correct message for auth/user-not-found', () => {
        error.code = "auth/user-not-found";
        expect(getErrorMessage(error)).toBe("Brak użytkownika w bazie!");
    });

    it('should return correct message for the rest of codes', () => {
        error.code = "anything";
        expect(getErrorMessage(error)).toBe("Nie udało się zalogować!");
    });
});
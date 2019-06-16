import {selectGame, selectChecker, setActivePoles, setNewGameState} from "./checkers";
import {SELECT_CHECKER, SELECT_GAME, SET_ACTIVE_POLES, SET_NEW_STATE} from "../constants/actionTypes";

describe("SelectGame", () => {
   it('should pass id as a payload', () => {
       expect(selectGame("2")).toStrictEqual({type: SELECT_GAME, payload: '2'});
   }) ;
});

describe("SelectChecker", () => {
   it('should pass col and row as a payload object with proper type', () => {
       expect(selectChecker(1,1)).toStrictEqual({type: SELECT_CHECKER, payload: {col:1, row:1}});
   });
});

describe("SetActivePoles", () => {
    it('should pass activePoles as a payload', () => {
        expect(setActivePoles({test: 'test'})).toStrictEqual({type: SET_ACTIVE_POLES, payload: {test:'test'}});
    });
});

describe("SetNewGameState", () => {
    it('should pass id and gameState as a payload', () => {
        expect(setNewGameState("2", 'test')).toStrictEqual({type: SET_NEW_STATE, payload: {id: "2", gameState:'test'}});
    });
});

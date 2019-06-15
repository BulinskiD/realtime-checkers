import gamesReducer from './gamesReducer';
import {SELECT_CHECKER, SELECT_GAME, SET_ACTIVE_POLES, SET_NEW_STATE} from "../constants/actionTypes";

const initialState = {id: null, playerIds: {}, status: 'not-started', nextMove: false, checkersPosition: [], activePoles: null};

describe("GamesReducer", () => {
   it('should set id from action payload on SELECT_GAME action', () => {
      expect(gamesReducer(initialState, {type: SELECT_GAME, payload:  '2'})).toStrictEqual({...initialState, id: '2'});
   });

   it('should return new state with selectedChecker for SELECT_CHECKER action', () => {
      const checkersPosition = [{col: 2, row: 2, selected:false}];
      initialState.checkersPosition = checkersPosition;

      expect(gamesReducer(initialState, {type: SELECT_CHECKER, payload: {col: 2, row: 2}}))
          .toStrictEqual({...initialState, checkersPosition, selectedChecker: {col:2,row:2, selected: true}});
   });

   it('should set new state for SET_NEW_STATE action', () => {
      const action = {type: SET_NEW_STATE, payload:{gameState: {}}};
      Object.assign(action.payload.gameState, initialState);
      action.payload.id = 'ss';
      action.payload.gameState.selectedChecker = {col:2, row:2, selected: true};

      expect(gamesReducer(initialState, action)).toStrictEqual({...action.payload.gameState, activePoles: null, id: 'ss'});
   });

   it('should return new state for SET_ACTIVE_POLES', () => {
      const action = {type: SET_ACTIVE_POLES, payload: {col: 2, row: 2}};
      expect(gamesReducer(initialState, action)).toStrictEqual({...initialState, activePoles: action.payload});
   });

   it('should return initial state for other action', () => {
      expect(gamesReducer(initialState, {type: ''})).toStrictEqual({...initialState});
   });

});
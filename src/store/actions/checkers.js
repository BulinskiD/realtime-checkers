import {SET_NEW_STATE, SELECT_CHECKER} from "../constants/actionTypes";

export const selectChecker = (col, row) => {
    return {
        type: SELECT_CHECKER,
        payload: {col, row}
    }
}

export const setNewGameState = (id, gameState) => {
    return {
        type: SET_NEW_STATE,
        payload: {id, gameState}
    }
}

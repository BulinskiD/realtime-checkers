import {SET_NEW_STATE, SELECT_CHECKER, SET_ACTIVE_POLES} from "../constants/actionTypes";

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
export const setActivePoles = (activePoles) => {
    return {
        type: SET_ACTIVE_POLES,
        payload: activePoles
    }
}

import {GET_CHECKERS, MOVE_CHECKER, SEED_CHECKERS} from "../constants/actionTypes";

export const seedCheckers = () => {
    return {
        type: SEED_CHECKERS
    }
}

export const getCheckersPositions = () => {
    return {
        type: GET_CHECKERS
    }
}


export const moveChecker = () => {

    return {
        type: MOVE_CHECKER
    }
}

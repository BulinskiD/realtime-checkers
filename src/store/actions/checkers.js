import {GET_CHECKERS, MOVE_CHECKER, SEED_CHECKERS, SELECT_CHECKER} from "../constants/actionTypes";
import seedCheckers from "../../utils/seedCheckers";
import {firestore} from "../../api/firebase";

export const startGame = id => async dispatch => {

    const board = seedCheckers();

    await firestore.collection("games").doc(id)
                   .collection('checkersPosition')
                   .doc('checkers').set({board});

    dispatch({
        type: SEED_CHECKERS,
        payload: board
    });
}

export const getCheckersPositions = () => {
    return {
        type: GET_CHECKERS
    }
}

export const selectChecker = (col, row) => {
    return {
        type: SELECT_CHECKER,
        payload: {col, row}
    }
}


export const moveChecker = () => {

    return {
        type: MOVE_CHECKER
    }
}

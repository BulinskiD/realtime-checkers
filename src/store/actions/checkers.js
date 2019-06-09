import {GET_CHECKERS, MOVE_CHECKER, SEED_CHECKERS, SELECT_CHECKER} from "../constants/actionTypes";
import seedCheckers from "../../utils/seedCheckers";
import {firestore} from "../../api/firebase";

export const startGame = id => async dispatch => {
    const board = seedCheckers();

    try {
        await firestore.collection("games").doc(id)
            .collection('checkersPosition')
            .doc('checkers').set({board});

        dispatch({
            type: SEED_CHECKERS,
            payload: board
        });
    } catch(error) {
        console.log(error);
    }
}

export const selectChecker = (col, row) => {
    return {
        type: SELECT_CHECKER,
        payload: {col, row}
    }
}

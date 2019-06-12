import {SELECT_GAME} from '../constants/actionTypes';

export const selectGame = (id) => {
    return {
        type: SELECT_GAME,
        payload: id
    }
}
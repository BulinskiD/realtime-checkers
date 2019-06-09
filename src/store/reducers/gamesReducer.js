import {SELECT_GAME} from "../constants/actionTypes";

export default (currentGame = {id: null, playerIds: {}, gameState: {}}, action) => {
    switch(action.type) {
        case SELECT_GAME:
            return {
                id: action.payload,
                playerIds: {},
                gameState: {}
            };

        default:
            return currentGame;
    }
}

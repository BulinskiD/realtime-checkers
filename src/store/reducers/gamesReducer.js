import {SEED_CHECKERS, SELECT_GAME, SELECT_CHECKER} from "../constants/actionTypes";

const initialState = {id: null, playerIds: {}, gameState: {}};

export default (currentGame = initialState, action) => {
    switch(action.type) {
        case SELECT_GAME:
            return {
                id: action.payload,
                ...currentGame
            };

        case SEED_CHECKERS:
            return {
                ...currentGame,
                gameState: {
                    status: 'started',
                    checkersPosition: action.payload
                }
            }
        case SELECT_CHECKER:
            const checkersPosition = currentGame.gameState.checkersPosition.map(item => {
                if(action.payload.col === item.col && action.payload.row === item.row) {
                    item.selected = true;
                } else {
                    item.selected = false;
                }
                return item;
            });

            return {
                ...currentGame,
                gameState: {
                    checkersPosition: checkersPosition
                }
            }

        default:
            return currentGame;
    }
}

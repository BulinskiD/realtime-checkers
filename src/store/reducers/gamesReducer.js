import {SELECT_GAME, SELECT_CHECKER, SET_NEW_STATE, SET_ACTIVE_POLES} from "../constants/actionTypes";

const initialState = {id: null, playerIds: {}, status: 'not-started', checkersPosition: [], activePoles: null};

export default (currentGame = initialState, action) => {
    switch(action.type) {
        case SELECT_GAME:
            return {
                ...currentGame,
                id: action.payload
            };
        case SELECT_CHECKER:
            let selectedChecker;
            const checkersPosition = currentGame.checkersPosition.map(item => {
                if(action.payload.col === item.col && action.payload.row === item.row) {
                    item.selected = true;
                    selectedChecker = item;
                } else {
                    item.selected = false;
                }

                return item;
            });

            return {
                ...currentGame,
                selectedChecker: selectedChecker,
                checkersPosition: checkersPosition
            }

        case SET_NEW_STATE:
            return {
                id: action.payload.id,
                activePoles: null,
                ...action.payload.gameState
            };

        case SET_ACTIVE_POLES:
            return {
                ...currentGame,
                activePoles: action.payload
            }

        default:
            return currentGame;
    }
}

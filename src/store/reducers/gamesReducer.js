import {SELECT_GAME, SELECT_CHECKER, SET_NEW_STATE, SET_ACTIVE_POLES, CLEAR_CURRENT_GAME} from "../constants/actionTypes";

const initialState = {id: null, players: {}, status: 'not-started', nextMove: false, checkersPosition: [], activePoles: null};

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
            };

        case SET_NEW_STATE:
            return {
                ...currentGame,
                ...action.payload.gameState,
                id: action.payload.id,
                activePoles: null
            };

        case SET_ACTIVE_POLES:
            return {
                ...currentGame,
                activePoles: action.payload
            };

        case CLEAR_CURRENT_GAME:
            return {...initialState};

        default:
            return currentGame;
    }
}

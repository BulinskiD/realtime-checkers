import seedCheckers from "./seedCheckers";
import {firestore} from "../api/firebase";
import handleError from "./handleError";

export default async (gameState, user) => {
    const {players} = gameState;

    gameState.players = players.map(item => {
           if(user === item.email) {
               item.started = true;
           }
           return item;
        });

    const board = seedCheckers();

    const {selectedChecker, activePoles, ...withoutChecker} = gameState;

    try {
        await firestore.collection("games").doc(gameState.id).set({
            ...withoutChecker,
            status: gameState.players.filter(item => item.started === true).length === 2 ? 'white' : 'not-started',
            checkersPosition: board
        });
    } catch (error) {
        handleError(error);
    }
}
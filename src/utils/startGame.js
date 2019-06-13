import seedCheckers from "./seedCheckers";
import {firestore} from "../api/firebase";

export default async (gameState) => {

    const board = seedCheckers();

    const {selectedChecker, activePoles, ...withoutChecker} = gameState;

    try {
        await firestore.collection("games").doc(gameState.id).set({
            ...withoutChecker,
            status: 'white',
            checkersPosition: board
        });
    } catch (error) {
        console.log(error);
    }
}
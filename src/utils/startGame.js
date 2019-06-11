import seedCheckers from "./seedCheckers";
import {firestore} from "../api/firebase";

export default async (gameState) => {

    const board = seedCheckers();

    try {
        await firestore.collection("games").doc(gameState.id).set({
            ...gameState,
            status: 'started',
            checkersPosition: board
        });
    } catch (error) {
        console.log(error);
    }
}
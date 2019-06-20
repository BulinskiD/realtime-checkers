import {firestore} from "../api/firebase";
import handleError from "./handleError";

export default async (email, gameID, players) => {
        players.push(email);
    try {
        await firestore.collection('games').doc(gameID).update({
            players: players
        });
        await firestore.collection('users').doc(email).update({
            gameID: gameID
        });
    } catch(error) {
        handleError(error);
    }
}
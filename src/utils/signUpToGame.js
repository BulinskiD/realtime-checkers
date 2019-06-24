import { firestore } from "../api/firebase";
import handleError from "./handleError";

export default async (email, gameID, players) => {
  const color = players.length === 0 ? "white" : "black";
  players.push({ email, started: false, color });
  try {
    await firestore
      .collection("games")
      .doc(gameID)
      .update({
        players: players
      });
    await firestore
      .collection("users")
      .doc(email)
      .update({
        gameID: gameID
      });
  } catch (error) {
    handleError(error);
  }
};

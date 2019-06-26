import { WHITE_WINNER, BLACK_WINNER } from "../store/constants/actionTypes";
import { firestore } from "../api/firebase";

export default async (time, status, players, gameID, inter) => {
  if (time > 180 && (status === "white" || status === "black")) {
    clearInterval(inter);
    const winnerStatus = status === "white" ? "black" : "white";

    if (players.filter(item => item.active).length !== 0)
      await firestore
        .collection("games")
        .doc(gameID)
        .update({
          status: winnerStatus === "white" ? WHITE_WINNER : BLACK_WINNER,
          updated: Date.now()
        });
  }
};

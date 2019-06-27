import { WHITE_WINNER, BLACK_WINNER } from "../store/constants/actionTypes";
import { firestore } from "../api/firebase";
import { TIMEOUT_TIME } from "../config/config-const";

export default async (time, status, players, gameID, inter) => {
  if (time > TIMEOUT_TIME && (status === "white" || status === "black")) {
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

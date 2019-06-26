import { firestore } from "../api/firebase";

export default async (players, email, gameID, isMounting) => {
  let isAPlayer = false;
  const newPlayers = players.map(item => {
    if (item.email === email) {
      item.active = isMounting;
      isAPlayer = true;
    }
    return item;
  });

  if (isAPlayer)
    await firestore
      .collection("games")
      .doc(gameID)
      .update({
        players: newPlayers
      });
};

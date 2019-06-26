import { firestore } from "../api/firebase";

export default async (players, email, gameID, isMounting) => {
  let isChange = false;
  const newPlayers = players.map(item => {
    if (item.email === email && item.active !== isMounting) {
      item.active = isMounting;
      isChange = true;
    }
    return item;
  });

  if (isChange)
    try {
      await firestore
        .collection("games")
        .doc(gameID)
        .update({
          players: newPlayers,
          updated: Date.now()
        });
    } catch (error) {
      if (error.code !== "not-found") {
        //Handle error here
        console.log(error);
      }
      //not-found is emitted when deleting game on leaving last player
    }
};

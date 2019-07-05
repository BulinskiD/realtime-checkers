import { firestore } from "../api/firebase";

export default async (currentGame, email, history) => {
  const { players } = currentGame;

  const newPlayers = players.filter(item => item.email !== email);
  try {
    const docRef = firestore.collection("games").doc(currentGame.id);
    if (players.length === 1) {
      await docRef.delete();
    } else {
      await docRef.update({
        players: newPlayers,
        updated: Date.now()
      });
    }
    history.push("/");
    await firestore
      .collection("users")
      .doc(email)
      .update({ gameID: null });
  } catch (error) {
    console.log(error);
  }
};

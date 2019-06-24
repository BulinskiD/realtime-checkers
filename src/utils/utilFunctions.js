import { BLACK_WINNER, WHITE_WINNER } from "../store/constants/actionTypes";

export const getPole = (col, row, position) => {
  let pole;
  if (position) {
    pole = position.filter(item => item.col === col && item.row === row);
    if (pole.length > 0) {
      return pole[0];
    }
  }

  return null;
};

export const checkNextStatus = (status, hasNextMove) => {
  if (
    (status === "black" && hasNextMove) ||
    (status === "white" && !hasNextMove)
  ) {
    return "black";
  }
  return "white";
};

export const checkIfWinner = (checkersPosition, status) => {
  const winner = status === "black" ? BLACK_WINNER : WHITE_WINNER;
  const color = status === "black" ? "white" : "black";
  const coloredCheckers = checkersPosition.filter(item => item.color === color);
  return coloredCheckers.length === 0 ? winner : null;
};

export const getMessage = status => {
  let message;
  switch (status) {
    case "black":
      message = { text: "Grają czarne", isEnded: false };
      break;
    case "white":
      message = { text: "Grają białe", isEnded: false };
      break;
    case WHITE_WINNER:
      message = { text: "Wygrały białe", isEnded: true };
      break;
    case BLACK_WINNER:
      message = { text: "Wygrały czarne", isEnded: true };
      break;
    default:
      message = { text: "", isEnded: false };
  }
  return message;
};

export const getErrorMessage = error => {
  switch (error.code) {
    case "auth/wrong-password":
      return "Błędne hasło!";
    case "auth/invalid-email":
      return "Niepoprawny adres email!";
    case "auth/user-not-found":
      return "Brak użytkownika w bazie!";
    case "user/exists":
      return "Ten email jest już zajęty!";
    default:
      return "Nie udało się zalogować!";
  }
};

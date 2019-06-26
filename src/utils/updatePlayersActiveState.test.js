import updatePlayersActiveState from "./updatePlayersActiveState";
import { firestore } from "../api/firebase";

jest.mock("../api/firebase");
firestore.collection = jest.fn();
const doc = jest.fn();
const update = jest.fn();
doc.mockReturnValue({ update });
firestore.collection.mockReturnValue({ doc });

describe("UpdatePlayersActiveState", () => {
  let data = {};

  beforeEach(() => {
    data = {
      players: [{ email: "test", active: true }],
      email: "test2",
      gameID: "232",
      isMounting: false
    };
  });

  it("should not call firestore when email is not in players array", () => {
    updatePlayersActiveState(
      data.players,
      data.email,
      data.gameID,
      data.isMounting
    );

    expect(firestore.collection).toHaveBeenCalledTimes(0);
  });

  it("should call firestore with modified array when email is in players array", () => {
    data.email = "test";
    updatePlayersActiveState(
      data.players,
      data.email,
      data.gameID,
      data.isMounting
    );

    expect(firestore.collection).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledWith({
      players: [{ email: "test", active: false }]
    });
  });
});

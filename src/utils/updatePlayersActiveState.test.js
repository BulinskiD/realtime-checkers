import updatePlayersActiveState from "./updatePlayersActiveState";
import { firestore } from "../api/firebase";
import handleError from "./handleError";

jest.mock("./handleError");
jest.mock("../api/firebase");
firestore.collection = jest.fn();
const doc = jest.fn();
const update = jest.fn();
doc.mockReturnValue({ update });
firestore.collection.mockReturnValue({ doc });

describe("UpdatePlayersActiveState", () => {
  let data = {};

  beforeEach(() => {
    update.mockClear();
    firestore.collection.mockClear();
    firestore.collection.mockReturnValue({ doc });
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
    Date.now = jest.fn();
    Date.now.mockReturnValue(123);
    data.email = "test";
    updatePlayersActiveState(
      data.players,
      data.email,
      data.gameID,
      data.isMounting
    );

    expect(firestore.collection).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledWith({
      players: [{ email: "test", active: false }],
      updated: 123
    });
  });

  //It is because it is returned when removing game on leave
  it("should do nothing when error.code === not-found", async () => {
    Date.now = jest.fn();
    Date.now.mockReturnValue(123);
    const prom = Promise.reject({ code: "not-found" });
    update.mockReturnValue(prom);
    data.email = "test";
    updatePlayersActiveState(
      data.players,
      data.email,
      data.gameID,
      data.isMounting
    );

    try {
      await prom;
    } catch (error) {
      expect(handleError).toHaveBeenCalledTimes(0);
    }
  });

  it("should call handle error when error.code !== not-found", async () => {
    Date.now = jest.fn();
    Date.now.mockReturnValue(123);
    const prom = Promise.reject({ code: "some-code-of-error" });
    update.mockReturnValue(prom);
    data.email = "test";
    updatePlayersActiveState(
      data.players,
      data.email,
      data.gameID,
      data.isMounting
    );

    try {
      await prom;
    } catch (error) {
      expect(handleError).toHaveBeenCalledTimes(1);
    }
  });
});

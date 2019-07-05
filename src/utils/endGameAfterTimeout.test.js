import endGameAfterTimeout from "./endGameAfterTimeout";
import { firestore } from "../api/firebase";
import { BLACK_WINNER } from "../store/constants/actionTypes";

jest.mock("../api/firebase");
firestore.collection = jest.fn();
const doc = jest.fn();
const update = jest.fn();
doc.mockReturnValue({ update });
Date.now = jest.fn();
Date.now.mockReturnValue(123);

describe("endGameAfterTimeout", () => {
  beforeEach(() => {
    firestore.collection.mockReset();
    doc.mockReset();
    update.mockReset();
    firestore.collection.mockReturnValue({ doc });
    doc.mockReturnValue({ update });
  });

  it("should call firestore after 180s", () => {
    const time = 192;
    const status = "white";
    const players = [
      { email: "test", active: true },
      { email: "test2", active: true }
    ];
    const gameID = "123";
    const inter = setInterval(() => {}, 1000);

    endGameAfterTimeout(time, status, players, gameID, inter);

    expect(firestore.collection).toHaveBeenCalledWith("games");
    expect(doc).toHaveBeenCalledWith(gameID);
    expect(update).toHaveBeenCalledWith({ status: BLACK_WINNER, updated: 123 });
  });

  it("shouldn't call anything when time < 180", () => {
    const time = 102;
    const status = "white";
    const players = [
      { email: "test", active: true },
      { email: "test2", active: true }
    ];
    const gameID = "123";
    const inter = setInterval(() => {}, 1000);

    endGameAfterTimeout(time, status, players, gameID, inter);

    expect(firestore.collection).toHaveBeenCalledTimes(0);
  });

  it("shouldn't call firestore when both players are inactive", () => {
    const time = 192;
    const status = "white";
    const players = [
      { email: "test", active: false },
      { email: "test2", active: false }
    ];
    const gameID = "123";
    const inter = setInterval(() => {}, 1000);

    endGameAfterTimeout(time, status, players, gameID, inter);

    expect(firestore.collection).toHaveBeenCalledTimes(0);
  });
});

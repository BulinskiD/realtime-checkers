import leaveGame from "./leaveGame";
import { firestore } from "../api/firebase";

jest.mock("../api/firebase");
firestore.collection = jest.fn();
const doc = jest.fn();
const push = jest.fn();
history.push = push;
Date.now = jest.fn();
let currentGame;

describe("leaveGame", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    firestore.collection.mockReturnValue({ doc });
    currentGame = {
      players: [{ email: "test" }, { email: "test2" }],
      id: "22"
    };
  });

  it("should call update method 2 times and history push", async () => {
    const update = jest.fn();
    const del = jest.fn();
    const prom = Promise.resolve(true);
    Date.now.mockReturnValue(100);
    update.mockReturnValue(prom);
    doc.mockReturnValue({ update, delete: del });
    leaveGame(currentGame, "test", history);
    await prom;
    expect(history.push).toHaveBeenCalledWith("/");
    expect(update).toHaveBeenCalledTimes(2);
    expect(update).toHaveBeenCalledWith({
      players: [currentGame.players[1]],
      updated: 100
    });
    expect(update).toHaveBeenCalledWith({ gameID: null });
  });

  it("should call delete method, update method and history push", async () => {
    currentGame.players = [currentGame.players[0]];
    const update = jest.fn();
    const del = jest.fn();
    const prom = Promise.resolve(true);
    Date.now.mockReturnValue(100);
    update.mockReturnValue(prom);
    del.mockReturnValue(prom);
    doc.mockReturnValue({ update, delete: del });
    leaveGame(currentGame, "test", history);
    await prom;
    expect(history.push).toHaveBeenCalledWith("/");
    expect(update).toHaveBeenCalledTimes(1);
    expect(del).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledWith({ gameID: null });
  });

  it("should handle error properly", async () => {
    expect.assertions(2);
    currentGame.players = [currentGame.players[0]];
    const update = jest.fn();
    const del = jest.fn();
    const prom = Promise.reject(false);
    Date.now.mockReturnValue(100);
    update.mockReturnValue(prom);
    del.mockReturnValue(prom);
    doc.mockReturnValue({ update, delete: del });
    try {
      leaveGame(currentGame, "test", history);
      await prom;
    } catch (error) {
      expect(history.push).toHaveBeenCalledTimes(0);
      expect(doc).toHaveBeenCalledTimes(1);
    }
  });
});

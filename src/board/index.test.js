import React from "react";
import { act } from "react-dom/test-utils";
import ConnectedBoard, { Board } from "./index";
import configureMockStore from "redux-mock-store";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import { firestore } from "../api/firebase";
import getActivePoles from "../utils/getActivePoles";
import PlayersManager from "./playersManager";
import updatePlayersActiveState from "../utils/updatePlayersActiveState";
import endGameAfterTimeout from "../utils/endGameAfterTimeout";
import { BLACK_WINNER } from "../store/constants/actionTypes";

jest.mock("../utils/endGameAfterTimeout");
jest.mock("../utils/updatePlayersActiveState");
jest.mock("./playersManager");
jest.mock("../utils/getActivePoles");
jest.mock("../api/firebase");
const item = { id: "22", data: () => data };
const unsubscriber = jest.fn();
const onSnapshot = jest.fn(func => {
  func(item);
  return unsubscriber;
});
const doc = jest.fn();
firestore.collection = jest.fn();
firestore.collection.mockReturnValue({ doc });
doc.mockReturnValue({ onSnapshot });

jest.mock("../utils/startGame");
const setNewGameState = jest.fn();
const setActivePoles = jest.fn();
const selectGame = jest.fn();

const mockStore = configureMockStore();

let data;
getActivePoles.mockReturnValue({ availablePoles: { col: 2, row: 2 } });

describe("Board", () => {
  beforeEach(() => {
    setNewGameState.mockClear();
    setActivePoles.mockClear();
    selectGame.mockClear();
    unsubscriber.mockClear();
    endGameAfterTimeout.mockClear();
    data = {
      currentGame: {
        status: "white",
        selectedChecker: { col: 2, row: 2 },
        checkersPosition: [{ col: 2, row: 2, color: "black", selected: false }],
        nextMove: false,
        players: [{ test: test }, { test: test }],
        updated: 100
      },
      user: { email: "test" },
      setNewGameState,
      selectGame,
      setActivePoles,
      match: { params: { id: "22" } }
    };
  });

  it("should render 64 poles and Start game button for given props", () => {
    const props = {
      ...data
    };
    const component = shallow(<Board {...props} />);
    expect(component.find("Connect(Pole)").length).toBe(64);
    expect(component).toMatchSnapshot();
  });

  it("should call firestore subscribe on component load", () => {
    const store = mockStore(data);
    const props = {
      ...data
    };

    mount(
      <Provider store={store}>
        <Board {...props} />
      </Provider>
    );

    expect(selectGame).toHaveBeenCalledWith("22");
    expect(setNewGameState).toHaveBeenCalledWith("22", data);
  });

  it("should unsubscribe on component unmount", () => {
    const store = mockStore(data);
    const clearCurrentGame = jest.fn();
    const props = {
      ...data,
      clearCurrentGame
    };
    const component = mount(
      <Provider store={store}>
        <Board {...props} />
      </Provider>
    );

    component.unmount();
    expect(unsubscriber).toHaveBeenCalledTimes(1);
    expect(clearCurrentGame).toHaveBeenCalledTimes(1);
  });

  it("should call setActivePoles when selectedChecker changes", () => {
    const store = mockStore(data);
    const props = {
      ...data
    };
    mount(
      <Provider store={store}>
        <Board {...props} />
      </Provider>
    );

    expect(setActivePoles).toBeCalledWith({ col: 2, row: 2 });
  });

  it("should call endGameAfterTimeout when updated changes", () => {
    Math.ceil = jest.fn().mockReturnValue(300);
    const store = mockStore({ ...data });
    jest.useFakeTimers();
    const props = {
      ...data
    };

    act(() => {
      mount(
        <Provider store={store}>
          <Board {...props} />
        </Provider>
      );
      jest.runOnlyPendingTimers();
    });

    expect(endGameAfterTimeout).toBeCalledWith(
      300,
      "white",
      data.currentGame.players,
      "22",
      2 //TODO Check why timer ref equals 2
    );
  });

  it("should call setTimeSinceMove with ended when game is ended", () => {
    data.currentGame.status = BLACK_WINNER;
    const store = mockStore({ ...data });
    const props = {
      ...data
    };

    let component = {};
    act(() => {
      component = mount(
        <Provider store={store}>
          <Board {...props} />
        </Provider>
      );
    });
    expect(component.find(".time").text()).toBe("ended");
  });

  it("shouldn't call setActivePoles when selectedChecker is null", () => {
    const store = mockStore(data);
    data.currentGame.selectedChecker = null;
    const props = {
      ...data
    };
    mount(
      <Provider store={store}>
        <Board {...props} />
      </Provider>
    );

    expect(setActivePoles).toBeCalledTimes(0);
  });
});

describe("MapStateToProps", () => {
  it("should correctly map state to props", () => {
    const store = mockStore({
      currentGame: {
        status: "white",
        selectedChecker: {},
        checkersPosition: [{ col: 2, row: 2, color: "black", selected: false }],
        players: [{ email: "test", color: "white" }],
        nextMove: false
      },
      user: { email: "test" }
    });

    const board = shallow(
      <ConnectedBoard store={store} {...{ match: { param: { id: 2 } } }} />
    );

    expect(board.find("Board").props().currentGame).toStrictEqual({
      status: "white",
      players: [{ email: "test", color: "white" }],
      selectedChecker: {},
      checkersPosition: [{ col: 2, row: 2, color: "black", selected: false }],
      nextMove: false
    });
    expect(board.find("Board").props().isActiveTurn).toBe(true);
  });
});

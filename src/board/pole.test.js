import React from "react";
import { shallow } from "enzyme";
import moveChecker from "../utils/moveChecker";
import { firestore } from "../api/firebase";
import ConnectedPole, { Pole } from "./pole";
import configureMockStore from "redux-mock-store";
import {
  getPole,
  checkNextStatus,
  checkIfWinner
} from "../utils/utilFunctions";
import handleError from "../utils/handleError";
import { BLACK_WINNER } from "../store/constants/actionTypes";

jest.mock("../utils/handleError");
jest.mock("../utils/utilFunctions");
jest.mock("../api/firebase");
jest.mock("../utils/moveChecker");

const mockedStore = configureMockStore();
checkIfWinner.mockReturnValue(null);
const doc = jest.fn();
const update = jest.fn();
firestore.collection = jest.fn();
firestore.collection.mockReturnValue({ doc });
doc.mockReturnValue({ update });

describe("Pole", () => {
  it("should render black checker for given props", () => {
    const props = {
      id: "2",
      status: "white",
      nextMove: true,
      isActiveTurn: true,
      checkersPosition: [],
      pole: { color: "black" },
      active: false,
      col: 1,
      row: 0
    };
    const component = shallow(<Pole {...props} />);
    expect(component).toMatchSnapshot();
  });

  it("should render active pole for given props", () => {
    const props = {
      id: "2",
      status: "white",
      isActiveTurn: true,
      nextMove: true,
      checkersPosition: [],
      pole: null,
      active: true,
      col: 1,
      row: 0
    };
    const component = shallow(<Pole {...props} />);

    expect(component.find("Connect(Checker)").exists()).toBeFalsy();
    expect(component.find(".active").exists()).toBeTruthy();
    expect(component).toMatchSnapshot();
  });

  it("should handle move properly", async () => {
    const selectChecker = jest.fn();
    const setActivePoles = jest.fn();
    const props = {
      id: "2",
      status: "white",
      isActiveTurn: true,
      nextMove: true,
      checkersPosition: [],
      pole: null,
      active: true,
      col: 1,
      row: 0,
      selectChecker,
      setActivePoles
    };
    moveChecker.mockReturnValue({
      checkersPosition: [],
      hasNextMove: false,
      selectedChecker: {}
    });
    checkNextStatus.mockReturnValue("black");
    const prom = Promise.resolve("OK");
    update.mockReturnValue(prom);

    const component = shallow(<Pole {...props} />);

    component.find(".active").simulate("click");

    await prom;
    expect(update).toBeCalledWith({
      status: "black",
      checkersPosition: [],
      selectedChecker: {},
      nextMove: false,
      from: {}
    });
  });

  it("should set status BLACK_WINNER for given input", async () => {
    const selectChecker = jest.fn();
    const setActivePoles = jest.fn();
    const props = {
      id: "2",
      status: "white",
      isActiveTurn: true,
      nextMove: true,
      checkersPosition: [],
      pole: null,
      active: true,
      col: 1,
      row: 0,
      selectChecker,
      setActivePoles
    };
    moveChecker.mockReturnValue({
      checkersPosition: [],
      hasNextMove: false,
      selectedChecker: {}
    });
    checkNextStatus.mockReturnValue("black");
    const prom = Promise.resolve("OK");
    update.mockReturnValue(prom);
    checkIfWinner.mockReturnValue(BLACK_WINNER);

    const component = shallow(<Pole {...props} />);

    component.find(".active").simulate("click");

    await prom;
    expect(update).toBeCalledWith({
      checkersPosition: [],
      selectedChecker: {},
      status: BLACK_WINNER,
      nextMove: false,
      from: {}
    });
  });

  it("should call handle error when request fails", async () => {
    expect.assertions(2);

    const selectChecker = jest.fn();
    const setActivePoles = jest.fn();
    const props = {
      id: "2",
      status: "white",
      isActiveTurn: true,
      nextMove: true,
      checkersPosition: [],
      pole: null,
      active: true,
      col: 1,
      row: 0,
      selectChecker,
      setActivePoles
    };
    moveChecker.mockReturnValue({
      checkersPosition: [],
      hasNextMove: false,
      selectedChecker: {}
    });
    checkNextStatus.mockReturnValue("black");
    const prom = Promise.reject("Error");
    update.mockReturnValue(prom);

    const component = shallow(<Pole {...props} />);

    component.find(".active").simulate("click");
    expect(update).toBeCalledWith({
      status: "black",
      checkersPosition: [],
      selectedChecker: {},
      nextMove: false,
      from: {}
    });
    try {
      await prom;
    } catch (error) {
      expect(handleError).toBeCalledWith("Error");
    }
  });
});

describe("MapStateToProps in Pole", () => {
  it("should map state to props correctly", () => {
    const storeState = {
      currentGame: {
        status: "white",
        selectedChecker: {},
        activePoles: [{ col: 2, row: 2 }],
        id: "22",
        checkersPosition: [{ col: 2, row: 2, color: "black", selected: false }],
        nextMove: false
      }
    };

    const props = {
      id: "22",
      status: "white",
      nextMove: false,
      checkersPosition: [{ col: 2, row: 2, color: "black", selected: false }],
      pole: { col: 2, row: 2 },
      active: true,
      col: 2,
      row: 2,
      selectedChecker: {}
    };

    getPole.mockReturnValue({ col: 2, row: 2 });
    const store = mockedStore(storeState);
    const component = shallow(<ConnectedPole store={store} col={2} row={2} />);
    expect(component.find("Pole").props()).toEqual(
      expect.objectContaining({ ...props })
    );
  });
});

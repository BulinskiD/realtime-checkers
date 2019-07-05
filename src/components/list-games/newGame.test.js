import React from "react";
import { act } from "react-dom/test-utils";
import ConnectedNewGame, { NewGame } from "./newGame";
import configureMockStore from "redux-mock-store";
import signUpToGame from "../../utils/signUpToGame";
import { firestore } from "../../api/firebase";
import { shallow } from "enzyme";

jest.mock("../../utils/signUpToGame");
jest.mock("../../api/firebase");
firestore.collection = jest.fn();
const add = jest.fn();
firestore.collection.mockReturnValue({ add });

describe("NewGame", () => {
  it("should display Link returnToGame when gameID is set", () => {
    const component = shallow(<NewGame user={{ gameID: "sda" }} />);
    expect(component.find("Link").props().to).toBe("/game/sda");
    expect(component.find("Button").text()).toBe("Powróć do gry!");
  });

  it("should display newGameForm when gameID is null", () => {
    const component = shallow(<NewGame user={{ gameID: null }} />);
    expect(component).toMatchSnapshot();
  });

  it("should show whole form after click on button", () => {
    const component = shallow(<NewGame user={{ gameID: null }} />);
    act(() => {
      component
        .find("Button")
        .at(0)
        .simulate("click");
    });
    expect(component).toMatchSnapshot();
  });

  it("should add new game after sending form with correct data", async () => {
    const selectGame = jest.fn();
    const prom = Promise.resolve({ id: "testID" });
    const sign = Promise.resolve();
    signUpToGame.mockReturnValue(sign);
    add.mockReturnValue(prom);
    const history = { push: jest.fn() };

    const component = shallow(
      <NewGame
        user={{ gameID: null, email: "test" }}
        selectGame={selectGame}
        history={history}
      />
    );
    act(() => {
      component
        .find("Button")
        .at(0)
        .simulate("click");
    });

    act(() => {
      component
        .find(".title")
        .props()
        .onChange({ target: { value: "test" } });
    });
    const preventDefault = jest.fn();

    act(() => {
      component
        .find("Styled(Form)")
        .props()
        .onSubmit({ preventDefault });
    });

    expect(preventDefault).toHaveBeenCalledTimes(1);
    await prom;
    await sign;
    expect(selectGame).toHaveBeenCalledWith("testID");
    expect(signUpToGame).toHaveBeenCalledWith("test", "testID", []);
    expect(history.push).toHaveBeenCalledWith("/game/testID");
  });

  it("should reset input on error", async () => {
    const selectGame = jest.fn();
    const prom = Promise.resolve({ id: "testID" });
    const sign = Promise.reject();
    signUpToGame.mockReturnValue(sign);
    add.mockReturnValue(prom);
    const history = { push: jest.fn() };

    const component = shallow(
      <NewGame
        user={{ gameID: null, email: "test" }}
        selectGame={selectGame}
        history={history}
      />
    );
    act(() => {
      component
        .find("Button")
        .at(0)
        .simulate("click");
    });

    act(() => {
      component
        .find(".title")
        .props()
        .onChange({ target: { value: "test" } });
    });
    const preventDefault = jest.fn();

    act(() => {
      component
        .find("Styled(Form)")
        .props()
        .onSubmit({ preventDefault });
    });
    try {
      await prom;
      await sign;
      expect(selectGame).toHaveBeenCalledWith("testID");
    } catch (error) {
      expect(component.find(".title").text()).toBe("");
      expect(signUpToGame).toHaveBeenCalledWith("test", "testID", []);
      expect(history.push).toHaveBeenCalledTimes(0);
    }
  });
});

describe("MapStateToProps", () => {
  const mockedStore = configureMockStore();

  it("should map state to props correctly", () => {
    const store = mockedStore({ user: { gameID: "test" } });
    const component = shallow(<ConnectedNewGame store={store} />);
    expect(component.find("NewGame").props().user).toStrictEqual({
      gameID: "test"
    });
  });
});

import React from "react";
import ConnectedApp, { App } from "./App";
import Login from "./components/auth";
import configureMockedStore from "redux-mock-store";
import Authenticated from "./components/shared/authenticated";
import ListGames from "./components/list-games";
import NewGame from "./components/list-games/newGame";
import Header from "./components/shared/header";
import Board from "./components/board";
import { shallow, mount } from "enzyme";

jest.mock("./components/list-games");
ListGames.mockReturnValue("");
const onUserAuthChange = jest.fn();
let props;
const mockedStore = configureMockedStore();
jest.mock("./components/shared/header");

describe("App", () => {
  beforeEach(() => {
    props = { authenticated: true, loading: false, onUserAuthChange };
    onUserAuthChange.mockClear();
  });

  it("Should render correct routes when loading is false", () => {
    const component = shallow(<App {...props} />);
    const listGamesFunc = component
      .find("Route")
      .at(0)
      .props()
      .component();
    expect(listGamesFunc).toStrictEqual(
      <Authenticated authenticated={true} display={<ListGames />} />
    );

    const boardFunc = component
      .find("Route")
      .at(1)
      .props()
      .component();
    expect(boardFunc).toStrictEqual(
      <Authenticated authenticated={true} display={<Board />} />
    );

    const comp = component
      .find("Route")
      .at(2)
      .props()
      .component();
    expect(comp).toStrictEqual(<Login />);

    expect(component).toMatchSnapshot();
  });

  it("Should render loading when loading prop is true", () => {
    props.loading = true;
    const component = shallow(<App {...props} />);
    expect(component).toMatchSnapshot();
  });

  it("Should call onUserAuthChange and onSelectedGameChange on load", () => {
    props.onSelectedGameChange = jest.fn();
    props.user = "email";
    mount(<App {...props} />);
    expect(onUserAuthChange).toHaveBeenCalledTimes(1);
    expect(props.onSelectedGameChange).toHaveBeenCalledWith("email");
  });
});

describe("MapStateToProps", () => {
  it("Should map state to props correctly", () => {
    const store = mockedStore({ user: { isLoggedIn: false, initial: false } });
    const component = shallow(<ConnectedApp store={store} />);
    expect(component.find("App").props().authenticated).toBe(false);
    expect(component.find("App").props().loading).toBe(false);
  });
});

import React from "react";
import configureMockStore from "redux-mock-store";
import ConnectedPlayersManager, { PlayersManager } from "./playersManager";
import { shallow } from "enzyme";
import startGame from "../../utils/startGame";
import signUpToGame from "../../utils/signUpToGame";
import leaveGame from "../../utils/leaveGame";

jest.mock("../../utils/leaveGame");
jest.mock("../../utils/startGame");
jest.mock("../../utils/signUpToGame");
let data;
beforeEach(() => {
  const currentGame = {
    currentGame: {
      status: "not-started",
      players: [],
      selectedChecker: { col: 2, row: 2 },
      checkersPosition: [{ col: 2, row: 2, color: "black", selected: false }],
      nextMove: false
    }
  };
  data = {
    ...currentGame,
    user: "test",
    canActivateGame: false,
    gameAvailable: true
  };
});

describe("PlayersManager", () => {
  it("Should display sign_up button for given props", () => {
    const component = shallow(<PlayersManager {...data} />);
    expect(component.find("Button").text()).toBe("Dołącz do gry");
    expect(component).toMatchSnapshot();
  });

  it("Should invoke sign_up_to_game function on button clicked", () => {
    const component = shallow(<PlayersManager {...data} gameID={"22"} />);
    component.find("Button").simulate("click");
    expect(signUpToGame).toHaveBeenCalledWith(
      "test",
      "22",
      data.currentGame.players
    );
  });

  it("Should display start_game button for given props", () => {
    data.canActivateGame = true;
    data.gameAvailable = false;
    data.currentGame.status = "not-started";
    const component = shallow(<PlayersManager {...data} />);
    expect(component.find("Button").text()).toBe("Zacznij grę");
    expect(component).toMatchSnapshot();
  });

  it("Should invoke start_game function on button clicked", () => {
    data.canActivateGame = true;
    data.gameAvailable = false;
    data.currentGame.status = "not-started";
    const component = shallow(<PlayersManager {...data} />);
    component.find("Button").simulate("click");
    expect(startGame).toHaveBeenCalledWith(data.currentGame, "test");
  });

  it("Should invoke leaveGame function on leave-game button clicked", () => {
    data.canActivateGame = true;
    data.gameAvailable = false;
    data.canLeaveGame = true;
    data.currentGame.status = "not-started";
    data.history = {};
    const component = shallow(<PlayersManager {...data} />);
    component.find(".leave-game").simulate("click");
    expect(leaveGame).toHaveBeenCalledWith(
      data.currentGame,
      "test",
      data.history
    );
  });

  it("Should display list of players", () => {
    data.currentGame.players = [
      { email: "test", started: true },
      { email: "test2", started: true }
    ];
    const component = shallow(<PlayersManager {...data} />);
    expect(component).toMatchSnapshot();
  });
});

describe("mapStateToProps", () => {
  const store = configureMockStore();
  it("Should map state to props correctly with canActivateGame == false && gameAvailable === true", () => {
    data.currentGame.players = [];
    const mockedStore = store({ ...data });
    const component = shallow(
      <ConnectedPlayersManager store={mockedStore} gameID={"22"} />
    );
    expect(component.find("PlayersManager").props().currentGame).toStrictEqual({
      ...data.currentGame
    });
    expect(component.find("PlayersManager").props().canActivateGame).toBe(
      false
    );
    expect(component.find("PlayersManager").props().gameAvailable).toBe(true);
  });

  it("Should map state to props correctly with canActivateGame == false && gameAvailable === false", () => {
    data.currentGame.players = [{ email: "test", started: true }];
    data.user = { email: "test" };
    const mockedStore = store({ ...data });
    const component = shallow(
      <ConnectedPlayersManager store={mockedStore} gameID={"22"} />
    );
    expect(component.find("PlayersManager").props().currentGame).toStrictEqual({
      ...data.currentGame
    });
    expect(component.find("PlayersManager").props().canActivateGame).toBe(
      false
    );
    expect(component.find("PlayersManager").props().gameAvailable).toBe(false);
  });

  it("Should map state to props correctly with canActivateGame == true && gameAvailable === false", () => {
    data.currentGame.players = [
      { email: "test", started: false },
      { email: "test2", started: false }
    ];
    data.user = { email: "test" };
    const mockedStore = store({ ...data });
    const component = shallow(
      <ConnectedPlayersManager store={mockedStore} gameID={"22"} />
    );
    expect(component.find("PlayersManager").props().currentGame).toStrictEqual({
      ...data.currentGame
    });
    expect(component.find("PlayersManager").props().canActivateGame).toBe(true);
    expect(component.find("PlayersManager").props().gameAvailable).toBe(false);
  });
});

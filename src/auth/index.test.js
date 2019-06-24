import React from "react";
import configureMockedStore from "redux-mock-store";
import { shallow, mount } from "enzyme";
import ConnectedLogin, { Login } from "./index";
import { act } from "react-dom/test-utils";
import ConnectedBoard from "../board";
const loginWithEmailAndPassword = jest.fn();
const history = {};
const preventDefault = jest.fn();
const formSubmit = { preventDefault };

describe("Auth", () => {
  const modalRoot = global.document.createElement("div");
  modalRoot.setAttribute("id", "root");
  const body = global.document.querySelector("body");
  body.appendChild(modalRoot);

  it("should render correctly with given props", () => {
    const LoginComp = shallow(
      <Login
        user={{ email: null }}
        loginWithEmailAndPassword={loginWithEmailAndPassword}
        history={history}
      />
    );
    expect(LoginComp).toMatchSnapshot();
  });

  it("should display alert correctly", () => {
    const LoginComp = shallow(
      <Login
        user={{ email: null, error: "Error text" }}
        loginWithEmailAndPassword={loginWithEmailAndPassword}
        history={history}
      />
    );
    expect(LoginComp).toMatchSnapshot();
  });

  it("should call history.push when email is set", () => {
    const push = jest.fn();
    const history = { push };
    const LoginComp = mount(
      <Login
        user={{ email: "ss", error: null }}
        loginWithEmailAndPassword={loginWithEmailAndPassword}
        history={history}
      />
    );
    expect(push).toHaveBeenCalledWith("/");
  });

  it("should handle login correctly", () => {
    const email = { target: { value: null } };
    email.target.value = "email";

    const password = { target: { value: null } };
    password.target.value = "password";

    const LoginComp = shallow(
      <Login
        user={{ email: "ss" }}
        loginWithEmailAndPassword={loginWithEmailAndPassword}
        history={history}
      />
    );

    act(() => {
      LoginComp.find(".email")
        .props()
        .onChange(email);
    });

    act(() => {
      LoginComp.find(".password")
        .props()
        .onChange(password);
    });

    act(() => {
      LoginComp.find("Styled(Form)")
        .props()
        .onSubmit(formSubmit);
    });

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(loginWithEmailAndPassword).toHaveBeenCalledWith(
      "email",
      "password",
      history
    );
  });
});

describe("MapStateToProps", () => {
  it("should correctly map state to props", () => {
    const mockStore = configureMockedStore();
    const store = mockStore({ user: { email: "test" } });
    const board = shallow(<ConnectedLogin store={store} />);
    expect(board.find("Login").props().user).toStrictEqual({ email: "test" });
  });
});

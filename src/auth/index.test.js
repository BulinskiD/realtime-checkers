import React from "react";
import configureMockedStore from "redux-mock-store";
import { shallow, mount } from "enzyme";
import ConnectedAuth, { Auth } from "./index";
import LoginForm from "./loginForm";
import RegistrationForm from "./registrationForm";
const loginWithEmailAndPassword = jest.fn();
const createUserWithEmailAndPassword = jest.fn();
const history = {};

describe("Auth", () => {
  const modalRoot = global.document.createElement("div");
  modalRoot.setAttribute("id", "root");
  const body = global.document.querySelector("body");
  body.appendChild(modalRoot);

  it("should render correctly with given props", () => {
    const authComp = shallow(
      <Auth
        user={{ email: null }}
        loginWithEmailAndPassword={loginWithEmailAndPassword}
        createUserWithEmailAndPassword={createUserWithEmailAndPassword}
        history={history}
        match={{ path: "/login" }}
      />
    );
    expect(
      authComp
        .find("Route")
        .at(0)
        .props().path
    ).toBe("/login/");

    expect(
      authComp
        .find("Route")
        .at(0)
        .props()
        .component()
    ).toStrictEqual(
      <LoginForm
        loginWithEmailAndPassword={loginWithEmailAndPassword}
        user={{ email: null }}
      />
    );

    expect(
      authComp
        .find("Route")
        .at(1)
        .props().path
    ).toBe("/login/register");

    expect(
      authComp
        .find("Route")
        .at(1)
        .props()
        .component()
    ).toStrictEqual(
      <RegistrationForm
        createUserWithEmailAndPassword={createUserWithEmailAndPassword}
        user={{ email: null }}
      />
    );

    expect(Auth).toMatchSnapshot();
  });
});

describe("MapStateToProps", () => {
  it("should correctly map state to props", () => {
    const mockStore = configureMockedStore();
    const store = mockStore({ user: { email: "test" } });
    const auth = shallow(<ConnectedAuth store={store} />);
    expect(auth.find("Auth").props().user).toStrictEqual({ email: "test" });
  });
});

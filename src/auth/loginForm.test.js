import React from "react";
import { StaticRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { shallow, mount } from "enzyme";
import LoginForm from "./loginForm";

const loginWithEmailAndPassword = jest.fn();
const history = {};
const preventDefault = jest.fn();
const e = { preventDefault };

describe("Login", () => {
  it("should handle login correctly", () => {
    const email = { target: { value: null } };
    email.target.value = "email";

    const password = { target: { value: null } };
    password.target.value = "password";

    const LoginComp = shallow(
      <LoginForm
        match={{ path: "/login" }}
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
        .onSubmit(e);
    });

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(loginWithEmailAndPassword).toHaveBeenCalledWith(
      "email",
      "password",
      history,
      expect.any(Function)
    );
  });
});

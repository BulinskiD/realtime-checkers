import React from "react";
import { act } from "react-dom/test-utils";
import { shallow, mount } from "enzyme";
import RegistrationForm from "./registrationForm";

const createUserWithEmailAndPassword = jest.fn();
const history = {};
const preventDefault = jest.fn();
const e = { preventDefault };

describe("RegistrationForm", () => {
  beforeEach(() => {
    createUserWithEmailAndPassword.mockClear();
    preventDefault.mockClear();
  });

  it("should handle registration correctly for valid inputs", () => {
    const email = { target: { value: null } };
    email.target.value = "email";

    const password = { target: { value: null } };
    password.target.value = "password";

    const repeatedPassword = { target: { value: null } };
    repeatedPassword.target.value = "password";

    const registrationForm = shallow(
      <RegistrationForm
        match={{ path: "/login" }}
        user={{}}
        createUserWithEmailAndPassword={createUserWithEmailAndPassword}
        history={history}
      />
    );

    act(() => {
      registrationForm
        .find(".email")
        .props()
        .onChange(email);
    });

    act(() => {
      registrationForm
        .find(".password")
        .props()
        .onChange(password);
    });

    act(() => {
      registrationForm
        .find(".rpt-password")
        .props()
        .onChange(repeatedPassword);
    });

    act(() => {
      registrationForm
        .find("Styled(Form)")
        .props()
        .onSubmit(e);
    });

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      "email",
      "password"
    );
  });

  it("should display proper message when passwords are different", () => {
    const email = { target: { value: null } };
    email.target.value = "email";

    const password = { target: { value: null } };
    password.target.value = "password";

    const repeatedPassword = { target: { value: null } };
    repeatedPassword.target.value = "different password";

    const registrationForm = shallow(
      <RegistrationForm
        match={{ path: "/login" }}
        user={{}}
        createUserWithEmailAndPassword={createUserWithEmailAndPassword}
        history={history}
      />
    );

    act(() => {
      registrationForm
        .find(".email")
        .props()
        .onChange(email);
    });

    act(() => {
      registrationForm
        .find(".password")
        .props()
        .onChange(password);
    });

    act(() => {
      registrationForm
        .find(".rpt-password")
        .props()
        .onChange(repeatedPassword);
    });

    act(() => {
      registrationForm
        .find("Styled(Form)")
        .props()
        .onSubmit(e);
    });

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(0);
    expect(registrationForm.find("span").text()).toBe(
      "Podane hasła różnią się od siebie!"
    );
  });
});

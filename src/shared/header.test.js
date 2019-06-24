import React from "react";
import ConnectedHeader, { Header } from "./header";
import configureMockStore from "redux-mock-store";
import { shallow } from "enzyme";

const mockedStore = configureMockStore();

describe("Header", () => {
  it("should display correct header for given input", () => {
    const userLogout = jest.fn();
    const component = shallow(<Header user="test" userLogout={userLogout} />);

    expect(component).toMatchSnapshot();
  });

  it("should call userLogout when button is clicked", () => {
    const userLogout = jest.fn();
    const component = shallow(<Header user="test" userLogout={userLogout} />);
    component
      .find("DropdownItem:last-child")
      .props()
      .onClick();
    expect(userLogout).toHaveBeenCalledTimes(1);
  });

  it("should map state to props correctly", () => {
    const store = mockedStore({ user: { email: "test" } });
    const component = shallow(<ConnectedHeader store={store} />);
    expect(component.find("Header").props().user).toBe("test");
  });
});

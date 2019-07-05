import React from "react";
import Authenticated from "./authenticated";
import { shallow } from "enzyme";

describe("Authenticated", () => {
  it("should render component when authenticated is true", () => {
    const component = shallow(
      <Authenticated authenticated={true} display={<div>Test</div>} />
    );

    expect(component.find("div").text()).toBe("Test");
    expect(Authenticated).toMatchSnapshot();
  });

  it("should redirect to /login when authenticated is false", () => {
    const component = shallow(
      <Authenticated authenticated={false} display={<div>Test</div>} />
    );

    expect(component.find("Redirect").props().to).toBe("/login");
  });
});

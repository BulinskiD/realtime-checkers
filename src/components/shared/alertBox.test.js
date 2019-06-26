import React from "react";
import AlertBox from "./alertBox";
import { shallow } from "enzyme";

describe("AlertBox", () => {
  it("should display Alert when message is !== null", () => {
    const component = shallow(<AlertBox message={"error message"} />);
    expect(component).toMatchSnapshot();
  });

  it("should not return Alert when message === null", () => {
    const component = shallow(<AlertBox message={null} />);
    expect(component.find("Alert").length).toBe(0);
  });
});

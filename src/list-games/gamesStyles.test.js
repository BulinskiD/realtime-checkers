import React from "react";
import { NewGameForm } from "./gamesStyles";
import { shallow } from "enzyme";

describe("NewGameForm", () => {
  it("should display correct component for show === false", () => {
    const component = shallow(<NewGameForm show={0} />);
    expect(
      component.props().forwardedComponent.componentStyle.rules[1](0)
    ).toBe("0");

    expect(
      component.props().forwardedComponent.componentStyle.rules[3](0)
    ).toBe("0");
  });

  it("should display correct component for show === true", () => {
    const component = shallow(<NewGameForm show={1} />);
    expect(
      component
        .props()
        .forwardedComponent.componentStyle.rules[1]({ show: true })
    ).toBe("100%");

    expect(
      component
        .props()
        .forwardedComponent.componentStyle.rules[3]({ show: true })
    ).toBe("1");
  });
});

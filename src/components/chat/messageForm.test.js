import React from "react";
import MessageForm from "./messageForm";
import { firestore } from "../../api/firebase";
import { shallow } from "enzyme";
import handleError from "../../utils/handleError";

jest.mock("../../utils/handleError");
jest.mock("../../api/firebase");
const add = jest.fn();
const chatCollection = jest.fn().mockReturnValue({ add });
const doc = jest.fn().mockReturnValue({ collection: chatCollection });
firestore.collection.mockReturnValue({ doc });
Date.now = jest.fn().mockReturnValue(100);

const e = { preventDefault: jest.fn() };

describe("MessageForm", () => {
  beforeEach(() => {
    handleError.mockClear();
    e.preventDefault.mockClear();
  });
  it("should send message correctly", () => {
    const component = shallow(<MessageForm email="test" gameID="22" />);
    component
      .find(".message")
      .props()
      .onChange({ target: { value: "Test message" } });

    component
      .find("Form")
      .props()
      .onSubmit(e);
    expect(e.preventDefault).toHaveBeenCalledTimes(1);
    expect(add).toHaveBeenCalledWith({
      content: "Test message",
      email: "test",
      created: 100
    });
  });

  it("should call handleError on request error", async () => {
    const prom = Promise.reject("error");
    add.mockReturnValue(prom);
    const component = shallow(<MessageForm email="test" gameID="22" />);
    component
      .find(".message")
      .props()
      .onChange({ target: { value: "Test message" } });

    component
      .find("Form")
      .props()
      .onSubmit(e);

    try {
      await prom;
    } catch (error) {
      expect(e.preventDefault).toHaveBeenCalledTimes(1);
      expect(add).toHaveBeenCalledWith({
        content: "Test message",
        email: "test",
        created: 100
      });
      expect(handleError).toHaveBeenCalledWith("error");
    }
  });
});

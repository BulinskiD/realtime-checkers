import React from "react";
import configureMockStore from "redux-mock-store";
import { act } from "react-dom/test-utils";
import ConnectedChat, { Chat } from "./index";
import { mount, shallow } from "enzyme";
import { firestore } from "../../api/firebase";

jest.mock("../../api/firebase");
firestore.collection = jest.fn();
const doc = jest.fn();
firestore.collection.mockReturnValue({ doc });
let item = { data: () => ({ content: "test", email: "email", created: 100 }) };
const data = { docs: [item] };

describe("Chat", () => {
  beforeEach(() => {
    doc.mockClear();
  });

  // Added mocked div for scrolling purposes
  const chatContainer = global.document.createElement("div");
  chatContainer.setAttribute("id", "chat");
  const body = global.document.querySelector("body");
  body.appendChild(chatContainer);

  it("should correctly subscribe and unsubscribe to firestore collection", () => {
    const unsubscriber = jest.fn();
    const onSnapshot = jest.fn(func => {
      func(data);
      return unsubscriber;
    });
    const orderBy = jest.fn().mockReturnValue({ onSnapshot });
    const collection = jest.fn().mockReturnValue({ orderBy });
    doc.mockReturnValue({ collection });

    act(() => {
      const component = mount(<Chat gameID="111" />);
      expect(onSnapshot).toHaveBeenCalledTimes(1);
      component.unmount();
      expect(unsubscriber).toHaveBeenCalledTimes(1);
    });
  });

  it("should pass data to MessagesList component by chat prop", () => {
    const onSnapshot = jest.fn(func => func(data));
    const orderBy = jest.fn().mockReturnValue({ onSnapshot });
    const collection = jest.fn().mockReturnValue({ orderBy });
    doc.mockReturnValue({ collection });
    let component = "";
    act(() => {
      component = mount(<Chat gameID="111" email="test" />);
    });
    component.setProps();

    expect(component.find("MessagesList").props().chat).toStrictEqual([
      {
        content: "test",
        email: "email",
        created: 100
      }
    ]);
  });

  it("should do nothing when data.docs is empty", () => {
    data.docs = [];
    const onSnapshot = jest.fn(func => func(data));
    const orderBy = jest.fn().mockReturnValue({ onSnapshot });
    const collection = jest.fn().mockReturnValue({ orderBy });
    doc.mockReturnValue({ collection });
    let component = "";
    act(() => {
      component = mount(<Chat gameID="111" email="test" />);
    });
    component.setProps();

    expect(component.find("MessagesList").props().chat).toStrictEqual([]);
  });
});

describe("mapStateToProps", () => {
  const mockedStore = configureMockStore();

  it("Should map state to props correctly", () => {
    const store = mockedStore({ user: { email: "test" } });
    const component = shallow(<ConnectedChat store={store} gameID="22" />);
    expect(component.find("Chat").props().email).toBe("test");
  });
});

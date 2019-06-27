import React from "react";
import { act } from "react-dom/test-utils";
import ConnectedChat, { Chat } from "./index";
import { mount, shallow } from "enzyme";
import { firestore } from "../../api/firebase";

jest.mock("../../api/firebase");
firestore.collection = jest.fn();
const doc = jest.fn();
firestore.collection.mockReturnValue({ doc });
let item = { data: () => ({ content: "test", email: "email", created: 100 }) };
const data = { docs: () => [item] };

describe("Chat", () => {
  beforeEach(() => {
    doc.mockClear();
  });

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
});

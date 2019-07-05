import { startLoading, stopLoading } from "./loading";
import { START_LOADING, STOP_LOADING } from "../constants/actionTypes";

describe("startLoading", () => {
  it("should dispatch action of type START_LOADING", () => {
    expect(startLoading()).toStrictEqual({ type: START_LOADING });
  });
});

describe("stopLoading", () => {
  it("should dispatch action of type STOP_LOADING", () => {
    expect(stopLoading()).toStrictEqual({ type: STOP_LOADING });
  });
});

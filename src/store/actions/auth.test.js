import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { getErrorMessage } from "../../utils/utilFunctions";
import {
  loginWithEmailAndPassword,
  userLogout,
  onUserAuthChange,
  onSelectedGameChange,
  createUserWithEmailAndPassword
} from "./auth";
import { auth, firestore } from "../../api/firebase";
import {
  LOGIN_FAILED,
  LOGOUT_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  SIGN_UP_TO_GAME,
  REGISTER_FAILED
} from "../constants/actionTypes";

jest.mock("../../utils/utilFunctions");
const store = configureMockStore([thunk]);
jest.mock("../../api/firebase");
firestore.collection = jest.fn();
const doc = jest.fn();
firestore.collection.mockReturnValue({ doc });

describe("LoginWithEmailAndPassword", () => {
  auth.signInWithEmailAndPassword = jest.fn();

  beforeEach(() => {
    auth.signInWithEmailAndPassword.mockClear();
  });

  it("should call history.push when there is no error", async () => {
    const mockedStore = store({ user: {} });
    expect.assertions(2);
    history.push = jest.fn();
    const prom = Promise.resolve("success");
    auth.signInWithEmailAndPassword.mockReturnValue(prom);

    mockedStore.dispatch(
      await loginWithEmailAndPassword("test", "test", history, () => {})
    );
    expect(auth.signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    await prom;
    expect(history.push).toHaveBeenCalledTimes(1);
  });

  it("should dispatch LOGIN_FAILED when there is an error", async () => {
    getErrorMessage.mockReturnValue("Error");
    const mockedStore = store({ user: {} });
    expect.assertions(3);
    history.push = jest.fn();
    const prom = Promise.reject("Error");
    auth.signInWithEmailAndPassword.mockReturnValue(prom);

    try {
      mockedStore.dispatch(
        await loginWithEmailAndPassword("test", "test", history, () => {})
      );
      expect(auth.signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
      await prom;
    } catch (error) {
      expect(history.push).toHaveBeenCalledTimes(0);
      expect(mockedStore.getActions()).toEqual([
        { type: LOGIN_FAILED, payload: { message: "Error" } }
      ]);
    }
  });
});

describe("UserLogout", () => {
  auth.signOut = jest.fn();

  beforeEach(() => {
    auth.signOut.mockClear();
  });

  it("should dispatch no action when there is no error", async () => {
    const mockedStore = store({ user: {} });
    expect.assertions(2);
    const prom = Promise.resolve("success");
    auth.signOut.mockReturnValue(prom);

    mockedStore.dispatch(await userLogout());
    expect(auth.signOut).toHaveBeenCalledTimes(1);
    await prom;
    expect(mockedStore.getActions()).toEqual([]);
  });

  it("should dispatch LOGOUT_FAILED action when there is an error", async () => {
    const mockedStore = store({ user: {} });
    expect.assertions(2);
    const prom = Promise.reject("Error");
    auth.signOut.mockReturnValue(prom);

    mockedStore.dispatch(await userLogout());
    expect(auth.signOut).toHaveBeenCalledTimes(1);
    try {
      await prom;
    } catch (error) {
      expect(mockedStore.getActions()).toEqual([{ type: LOGOUT_FAILED }]);
    }
  });
});

describe("OnUserAuthChange", () => {
  beforeEach(() => {
    auth.onAuthStateChanged.mockClear();
  });

  it("should dispatch LOGIN_SUCCESS when fn called with user != null", async () => {
    auth.onAuthStateChanged = jest.fn(func => {
      func("user");
    });
    const mockedStore = store({ user: {} });

    mockedStore.dispatch(await onUserAuthChange());

    expect(auth.onAuthStateChanged).toHaveBeenCalledTimes(1);
    expect(mockedStore.getActions()).toEqual([
      { type: LOGIN_SUCCESS, payload: "user" }
    ]);
  });

  it("should dispatch LOGOUT_SUCCESS when fn called with user == null", async () => {
    auth.onAuthStateChanged = jest.fn(func => {
      func(null);
    });
    const mockedStore = store({ user: {} });

    mockedStore.dispatch(await onUserAuthChange());

    expect(auth.onAuthStateChanged).toHaveBeenCalledTimes(1);
    expect(mockedStore.getActions()).toEqual([{ type: LOGOUT_SUCCESS }]);
  });
});

describe("OnSelectedGameChange", () => {
  it("should dispatch SIGN_UP_TO_GAME when new data is available", () => {
    const mockedStore = store({ user: {} });
    const onSnapshot = jest.fn(func =>
      func({ data: () => ({ gameID: "test" }) })
    );
    doc.mockReturnValue({ onSnapshot });
    mockedStore.dispatch(onSelectedGameChange("test"));

    expect(onSnapshot).toHaveBeenCalledTimes(1);
    expect(mockedStore.getActions()).toEqual([
      { type: SIGN_UP_TO_GAME, payload: { gameID: "test" } }
    ]);
  });

  it("should not dispatch SIGN_UP_TO_GAME when new data is null", () => {
    const mockedStore = store({ user: {} });
    const onSnapshot = jest.fn(func => func(null));
    doc.mockReturnValue({ onSnapshot });
    mockedStore.dispatch(onSelectedGameChange("test"));

    expect(onSnapshot).toHaveBeenCalledTimes(1);
    expect(mockedStore.getActions()).toEqual([]);
  });
});

describe("createUserWithEmailAndPassword", () => {
  auth.createUserWithEmailAndPassword = jest.fn();

  it("should call createUserWithEmailAndPassword and dispatch no action when successful", async () => {
    const prom = Promise.resolve("OK");
    auth.createUserWithEmailAndPassword.mockReturnValue(prom);
    const get = jest.fn();
    const set = jest.fn();
    set.mockReturnValue(Promise.resolve());
    doc.mockReturnValue({ get, set });
    const available = Promise.resolve({ exists: false });
    get.mockReturnValue(available);
    const mockedStore = store({ user: {} });
    mockedStore.dispatch(
      await createUserWithEmailAndPassword(
        "dawidbulinski132@wp.pl",
        "testtest",
        () => {}
      )
    );

    await available;
    await prom;
    expect(mockedStore.getActions()).toEqual([]);
  });

  it("should call createUserWithEmailAndPassword and dispatch REGISTER_FAILED when document exists", async () => {
    getErrorMessage.mockReturnValue("Error");
    const prom = Promise.reject("Error");
    auth.createUserWithEmailAndPassword.mockReturnValue(prom);
    const get = jest.fn();
    const set = jest.fn();
    set.mockReturnValue(Promise.resolve());
    doc.mockReturnValue({ get, set });
    const available = Promise.resolve({ exists: true });
    get.mockReturnValue(available);
    const mockedStore = store({ user: {} });
    mockedStore.dispatch(
      await createUserWithEmailAndPassword("test", "test", () => {})
    );

    try {
      await available;
      await prom;
    } catch (error) {
      expect(mockedStore.getActions()).toEqual([
        { type: REGISTER_FAILED, payload: { message: "Error" } }
      ]);
    }
  });

  it("should call createUserWithEmailAndPassword and dispatch REGISTER_FAILED when request fails", async () => {
    getErrorMessage.mockReturnValue("Error");
    const prom = Promise.reject();
    auth.createUserWithEmailAndPassword.mockReturnValue(prom);
    const get = jest.fn();
    const set = jest.fn();
    set.mockReturnValue(prom);
    doc.mockReturnValue({ get, set });
    const available = Promise.resolve({ exists: false });
    get.mockReturnValue(available);
    const mockedStore = store({ user: {} });
    mockedStore.dispatch(
      await createUserWithEmailAndPassword("test", "test", () => {})
    );

    try {
      await available;
      await prom;
    } catch (error) {
      expect(mockedStore.getActions()).toEqual([
        { type: REGISTER_FAILED, payload: { message: "Error" } }
      ]);
    }
  });
});

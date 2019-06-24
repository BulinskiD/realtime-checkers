import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  SIGN_UP_TO_GAME,
  REGISTER_FAILED
} from "../constants/actionTypes";
import { auth, firestore } from "../../api/firebase";
import { getErrorMessage } from "../../utils/utilFunctions";

export const createUserWithEmailAndPassword = (
  email,
  password,
  setLoading
) => async dispatch => {
  try {
    const resp = await firestore
      .collection("users")
      .doc(email)
      .get();
    if (!resp.exists) {
      // Automatically logged in when succeed, no need to dispatch any action beacause of subscription in onUserAuthChange action
      await firestore
        .collection("users")
        .doc(email)
        .set({ gameID: null });
      await auth.createUserWithEmailAndPassword(email, password);
      setLoading(false);
    } else {
      const error = new Error();
      error.code = "user/exists";
      throw error;
    }
  } catch (error) {
    const message = getErrorMessage(error);
    dispatch({ type: REGISTER_FAILED, payload: { message } });
    setLoading(false);
  }
};

export const loginWithEmailAndPassword = (
  email,
  password,
  history,
  setLoading
) => async dispatch => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    setLoading(false);
    history.push("/");
  } catch (error) {
    const message = getErrorMessage(error);
    dispatch({
      type: LOGIN_FAILED,
      payload: { message }
    });
    setLoading(false);
  }
};

export const userLogout = () => async dispatch => {
  try {
    await auth.signOut();
  } catch (error) {
    dispatch({
      type: LOGOUT_FAILED
    });
  }
};

export const onUserAuthChange = () => dispatch => {
  auth.onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: user
      });
    } else {
      dispatch({
        type: LOGOUT_SUCCESS
      });
    }
  });
};

export const onSelectedGameChange = email => dispatch => {
  firestore
    .collection("users")
    .doc(email)
    .onSnapshot(data => {
      if (data) {
        dispatch({
          type: SIGN_UP_TO_GAME,
          payload: data.data()
        });
      }
    });
};

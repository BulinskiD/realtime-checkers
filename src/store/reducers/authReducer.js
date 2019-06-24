import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  SIGN_UP_TO_GAME,
  REGISTER_FAILED
} from "../constants/actionTypes";

export default (
  user = { email: null, isLoggedIn: false, error: null, initial: true },
  action
) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        email: action.payload.email,
        isLoggedIn: true,
        initial: false,
        error: null
      };
    case LOGIN_FAILED || REGISTER_FAILED:
      return {
        email: null,
        isLoggedIn: false,
        initial: false,
        error: action.payload.message
      };
    case LOGOUT_SUCCESS:
      return {
        email: null,
        isLoggedIn: false,
        initial: false,
        error: null
      };
    case SIGN_UP_TO_GAME:
      return {
        ...user,
        gameID: action.payload.gameID
      };
    default:
      return user;
  }
};

import { combineReducers } from "redux";
import authReducer from "./authReducer";
import gamesReducer from "./gamesReducer";

export default combineReducers({
  user: authReducer,
  currentGame: gamesReducer
});

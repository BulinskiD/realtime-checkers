import {LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT_SUCCESS, SIGN_UP_TO_GAME} from "../constants/actionTypes";

export default (user = {email: null, isLoggedIn: false, initial: true}, action) => {
    switch(action.type) {
        case LOGIN_SUCCESS:
            return {
                email: action.payload.email,
                isLoggedIn: true,
                initial: false
                };
        case LOGIN_FAILED:
            return {
                email: null,
                isLoggedIn: false,
                initial: false,
            };
        case LOGOUT_SUCCESS:
            return {
                email: null,
                isLoggedIn: false,
                initial: false
            };
        case SIGN_UP_TO_GAME:
            return {
              ...user,
              gameID: action.payload.gameID
            };
        default:
            return user;
    }
}

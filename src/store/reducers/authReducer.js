import {LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT_SUCCESS} from "../constants/actionTypes";

export default (user = {email: null, isLoggedIn: false}, action) => {
    switch(action.type) {
        case LOGIN_SUCCESS:
            return {
                email: action.payload.email,
                isLoggedIn: true
                };
        case LOGIN_FAILED:
            return {
                email: null,
                isLoggedIn: false
            };
        case LOGOUT_SUCCESS:
            return {
                email: null,
                isLoggedIn: false
            };
        default:
            return user;
    }
}

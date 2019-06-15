import authReducer from './authReducer';
import {LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT_SUCCESS} from "../constants/actionTypes";

const logoutSucces= {
    email: null,
    isLoggedIn: false,
    initial: false
}

describe("AuthReducer", () => {
   it('Should set logoutSuccess obj for LogoutSuccess action', () => {
        expect(authReducer(null, {type: LOGOUT_SUCCESS})).toStrictEqual(logoutSucces);
   });
    it('Should set logoutSuccess obj for LoginFailed action', () => {
        expect(authReducer(null, {type: LOGIN_FAILED})).toStrictEqual(logoutSucces);
    }) ;
    it('Should set email from payload for LoginSuccess action', () => {
        expect(authReducer(null, {type: LOGIN_SUCCESS, payload: {email: "test"}}))
            .toStrictEqual({email: "test", isLoggedIn: true, initial: false});
    });
    it('Should set initial object for different actions', () => {
        const initial = {};
        expect(authReducer(initial, {type: ''}))
            .toStrictEqual(initial);
    }) ;
});
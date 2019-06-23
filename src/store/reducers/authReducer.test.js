import authReducer from './authReducer';
import {LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT_SUCCESS, SIGN_UP_TO_GAME} from "../constants/actionTypes";

const logoutSuccess= {
    email: null,
    isLoggedIn: false,
    error: null,
    initial: false
}

describe("AuthReducer", () => {
   it('Should set logoutSuccess obj for LogoutSuccess action', () => {
        expect(authReducer(null, {type: LOGOUT_SUCCESS})).toStrictEqual(logoutSuccess);
   });
    it('Should set logoutSuccess obj for LoginFailed action', () => {
        expect(authReducer(null, {type: LOGIN_FAILED, payload: {message: "test"}})).toStrictEqual({...logoutSuccess, error: 'test'});
    }) ;
    it('Should set email from payload for LoginSuccess action', () => {
        expect(authReducer(null, {type: LOGIN_SUCCESS, payload: {email: "test"}}))
            .toStrictEqual({email: "test", isLoggedIn: true, error: null, initial: false});
    });
    it('Should set gameId from action payload for sign_up_to_game action type', () => {
        expect(authReducer(null, {type: SIGN_UP_TO_GAME, payload: {gameID: "test"}}))
            .toStrictEqual( {gameID: "test"});
    });
    it('Should set initial object for different actions', () => {
        const initial = {};
        expect(authReducer(initial, {type: ''}))
            .toStrictEqual(initial);
    }) ;
});
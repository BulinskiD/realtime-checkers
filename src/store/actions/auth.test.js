import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {loginWithEmailAndPassword, userLogout, onUserAuthChange} from './auth';
import {auth} from '../../api/firebase';
import { LOGIN_FAILED, LOGOUT_FAILED, LOGIN_SUCCESS } from '../constants/actionTypes';

const store = configureMockStore([thunk]);
jest.mock('../../api/firebase');

describe("LoginWithEmailAndPassword", () => {
    auth.signInWithEmailAndPassword = jest.fn();

    beforeEach(() => {
        auth.signInWithEmailAndPassword.mockClear();
    });

    it('should call history.push when there is no error', async () => {
        const mockedStore = store({user: {}});
        expect.assertions(2);
        history.push = jest.fn();
        const prom = Promise.resolve("success");
        auth.signInWithEmailAndPassword.mockReturnValue(prom);

        mockedStore.dispatch(await loginWithEmailAndPassword('test', 'test', history));
        expect(auth.signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
        await prom;
        expect(history.push).toHaveBeenCalledTimes(1);
    });

    it('should dispatch LOGIN_FAILED when there is an error', async () => {
        const mockedStore = store({user: {}});
        expect.assertions(3);
        history.push = jest.fn();
        const prom = Promise.reject("Error");
        auth.signInWithEmailAndPassword.mockReturnValue(prom);

        try {
            mockedStore.dispatch(await loginWithEmailAndPassword('test', 'test', history));
            expect(auth.signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
            await prom;
        } catch(error) {
            expect(history.push).toHaveBeenCalledTimes(0);
            expect(mockedStore.getActions()).toEqual([{type: LOGIN_FAILED, payload: "Error"}]);
        }
    });

});

describe("UserLogout", () => {
    auth.signOut = jest.fn();

    beforeEach(() => {
        auth.signOut.mockClear();
    });

    it('should dispatch no action when there is no error', async () => {
        const mockedStore = store({user: {}});
        expect.assertions(2);
        const prom = Promise.resolve("success");
        auth.signOut.mockReturnValue(prom);

        mockedStore.dispatch(await userLogout());
        expect(auth.signOut).toHaveBeenCalledTimes(1);
        await prom;
        expect(mockedStore.getActions()).toEqual([]);
    });

    it('should dispatch LOGOUT_FAILED action when there is an error', async () => {
        const mockedStore = store({user: {}});
        expect.assertions(2);
        const prom = Promise.reject("Error");
        auth.signOut.mockReturnValue(prom);

        mockedStore.dispatch(await userLogout());
        expect(auth.signOut).toHaveBeenCalledTimes(1);
        try {
            await prom;
        } catch(error) {
            expect(mockedStore.getActions()).toEqual([{type: LOGOUT_FAILED}]);
        }
    });
});


//TODO!!
// describe("OnUserAuthChange", () => {

//     beforeEach(() => {
//         auth.onAuthStateChanged.mockClear();
//     });

//     it('should dispatch LOGIN_SUCCESS when user != null', async () => {
//         auth.onAuthStateChanged = jest.fn();
//         const mockedStore = store({user: {}});
//         const prom = Promise.resolve('user');

//         mockedStore.dispatch(await onUserAuthChange());

//         expect(auth.onAuthStateChanged).toHaveBeenCalledWith('test');
//         expect(mockedStore.getActions()).toEqual([{type: LOGIN_SUCCESS, payload: 'user'}]);
//     });
// });


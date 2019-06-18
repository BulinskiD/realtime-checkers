import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {loginWithEmailAndPassword, userLogout, onUserAuthChange, onSelectedGameChange} from './auth';
import {auth, firestore} from '../../api/firebase';
import {LOGIN_FAILED, LOGOUT_FAILED, LOGIN_SUCCESS, LOGOUT_SUCCESS, SIGN_UP_TO_GAME} from '../constants/actionTypes';

const store = configureMockStore([thunk]);
jest.mock('../../api/firebase');
firestore.collection = jest.fn();
const doc = jest.fn();
firestore.collection.mockReturnValue({doc});

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

describe("OnUserAuthChange", () => {

    beforeEach(() => {
        auth.onAuthStateChanged.mockClear();
    });

    it('should dispatch LOGIN_SUCCESS when fn called with user != null', async () => {
        auth.onAuthStateChanged = jest.fn((func) => {
            func("user");
        });
        const mockedStore = store({user: {}});

        mockedStore.dispatch(await onUserAuthChange());

        expect(auth.onAuthStateChanged).toHaveBeenCalledTimes(1);
        expect(mockedStore.getActions()).toEqual([{type: LOGIN_SUCCESS, payload: 'user'}]);
    });

    it('should dispatch LOGOUT_SUCCESS when fn called with user == null', async () => {
        auth.onAuthStateChanged = jest.fn((func) => {
            func(null);
        });
        const mockedStore = store({user: {}});

        mockedStore.dispatch(await onUserAuthChange());

        expect(auth.onAuthStateChanged).toHaveBeenCalledTimes(1);
        expect(mockedStore.getActions()).toEqual([{type: LOGOUT_SUCCESS}]);
    });
});

describe('OnSelectedGameChange', () => {

    it('should dispatch SIGN_UP_TO_GAME when new data is available', () => {
        const mockedStore = store({user: {}});
        const onSnapshot = jest.fn(func => func({data: ()=> ({gameID: 'test'})}));
        doc.mockReturnValue({onSnapshot});
        mockedStore.dispatch(onSelectedGameChange('test'));

        expect(onSnapshot).toHaveBeenCalledTimes(1);
        expect(mockedStore.getActions()).toEqual([{type: SIGN_UP_TO_GAME, payload: {gameID: 'test'}}]);
    });

});


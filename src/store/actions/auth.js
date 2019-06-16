import {LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT_SUCCESS, LOGOUT_FAILED} from '../constants/actionTypes';
import {auth} from '../../api/firebase';

export const loginWithEmailAndPassword = (email, password, history) => async dispatch => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
        history.push('/');
    } catch(error) {
        dispatch({
           type: LOGIN_FAILED,
           payload: error
        });
    }
}

export const userLogout = () => async dispatch => {
    try {
        await auth.signOut();
    } catch(error) {
        dispatch({
            type: LOGOUT_FAILED,
        });
    }
}

export const onUserAuthChange = () => dispatch => {
    auth.onAuthStateChanged(user => {
        if(user) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: user
            });
        } else {
            dispatch({
                type: LOGOUT_SUCCESS
            })
        }
    });
}

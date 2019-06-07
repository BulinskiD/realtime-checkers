import { LOGIN_SUCCESS } from '../constants/actionTypes';
import { auth } from '../api/firebase';

export const loginWithEmailAndPassword = (email, password) => async dispatch => {

    try {
        await auth.signInWithEmailAndPassword("dawidbulinski132@gmail.com", "Bulion1!");
    } catch(error) {
        console.log(error);
    }

    dispatch({
        type: LOGIN_SUCCESS,
    });
}

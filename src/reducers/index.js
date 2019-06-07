import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { TEST_ACTION } from "../constants/actionTypes";

const testReducer = (test = "sth", action) => {
    if(action.type === TEST_ACTION) {
        return "I WAS INVOKED!";
    }
    return test;
}

export default combineReducers(
    {
                test: testReducer,
                user: authReducer
            });

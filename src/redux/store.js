import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import authReducer from './authReducer';
import appReducer from './appReducer';
import chatReducer from './chatReducer';
import usersReducer from './usersReducer';


let reducers = combineReducers({
    auth: authReducer,
    app: appReducer,
    chat: chatReducer,
    users: usersReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));


window.store = store;

export default store;   
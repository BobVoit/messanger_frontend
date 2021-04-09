import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import authReducer from './authReducer';
import appReducer from './appReducer';
import chatReducer from './chatReducer';


let reducers = combineReducers({
    auth: authReducer,
    app: appReducer,
    chat: chatReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));


window.store = store;

export default store;   
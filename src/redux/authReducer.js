import { authAPI, usersAPI } from '../api/api';
import { hashUserData } from '../common';

const SET_USER_DATA = 'SET_USER_DATA';
const SET_AUTH_ERROR = 'SET_AUTH_ERROR';
const SET_IS_SIGN_UP = 'SET_IS_SIGN_UP';

let initialState = {
    id: null,
    login: null,
    password: null,
    token: null,
    nickname: null,
    isAuth: false,
    status: null,
    error: null,
    isSignUp: false
}


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                id: Number(action.id),
                login: action.login,
                password: action.password,
                nickname: action.nickname,
                isAuth: action.isAuth,
                status: action.status,
                token: action.token
            }
        }
        case SET_AUTH_ERROR: {
            return {
                ...state,
                error: action.error,
            }
        }
        case SET_IS_SIGN_UP: {
            return {
                ...state,
                isSignUp: true
            }
        }
        default:
            return state;
    }
}

// action creators


export const setUserData = (id, login, password, nickname, isAuth, status, token) => {
    console.log(id, login, password, nickname, isAuth, status, token);
    return {
        type: SET_USER_DATA,
        id, login, password, nickname, isAuth, status, token
}};

export const setAuthError = (error) => ({
    type: SET_AUTH_ERROR,
    error
})

export const setIsSignUp = () => ({
    type: SET_IS_SIGN_UP
})



export const registration = (login, nickname, password) => async (dispatch) => {
    const { passHash, token, num } = hashUserData(login, password);
    let response = await authAPI.registration(login, nickname, passHash, token, num);
    const { result, data } = response.data;
    if (result === 'ok' && data) {
        localStorage.setItem('token', data);
        dispatch(getUserData(data));
    }
}

export const login = (login, password) => async (dispatch) => {
    const { passHash, token, num } = hashUserData(login, password);
    let response = await authAPI.login(login, passHash, token, num);
    const { result, data } = response.data;
    if (result === 'ok' && data) {
        localStorage.setItem('token', data);
        dispatch(getUserData(data));
    }
}

export const getUserData = (token) => async (dispatch) => {
    let response = await usersAPI.getUserData(token);
    const { result, data } = response.data;
    if (result === 'ok' && data) {
        const { id, login, password, nickname, status, token } = data;
        dispatch(setUserData(id, login, password, nickname, true, status, token));
    }
}

export const logout = () => async (dispatch) => {
    const token = localStorage.getItem('token');
    let response = await authAPI.logout(token);
    const { result, data } = response.data;
    if (result === 'ok' && data) {
        localStorage.removeItem('token');
        dispatch(setUserData(null, null, null, null, false, null, null));
    }
}



export default authReducer;
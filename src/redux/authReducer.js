import { authAPI, usersAPI, avatarAPI } from '../api/api';
import { hashUserData } from '../common';

// constants
const SET_USER_DATA = 'SET_USER_DATA';
const SET_AUTH_ERROR = 'SET_AUTH_ERROR';
const SET_IS_SIGN_UP = 'SET_IS_SIGN_UP';
const SET_AVATAR = 'SET_AVATAR';


// initial state
let initialState = {
    id: null,
    login: null,
    password: null,
    token: null,
    nickname: null,
    isAuth: false,
    status: null,
    error: null,
    isSignUp: false,
    aboutText: null,
    avatar: null,
}


// reducer

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
                token: action.token,
                aboutText: action.aboutText,
                avatar: action.avatar,
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
        case SET_AVATAR: {
            return {
                ...state, 
                avatar: action.avatar
            }
        }
        default:
            return state;
    }
}

// action creators

export const setUserData = (id, login, password, nickname, isAuth, status, token, aboutText, avatar) => {
    return {
        type: SET_USER_DATA,
        id, login, password, nickname, isAuth, status, token, aboutText, avatar
}};

export const setAuthError = (error) => ({
    type: SET_AUTH_ERROR,
    error
})

export const setIsSignUp = () => ({
    type: SET_IS_SIGN_UP
})

export const setAvatar = (avatar) => ({
    type: SET_AVATAR,
    avatar
})


// thunk

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
        const { id, login, password, nickname, status, token, aboutText, avatar } = data;
        dispatch(setUserData(id, login, password, nickname, true, status, token, aboutText, avatar));
    } else {
        localStorage.removeItem('token');
    }
}

export const logout = () => async (dispatch) => {
    const token = localStorage.getItem('token');
    let response = await authAPI.logout(token);
    const { result, data } = response.data;
    if (result === 'ok' && data) {
        localStorage.removeItem('token');
        dispatch(setUserData(null, null, null, null, false, null, null, null, null));
    }
}

export const saveUserAvatar = (avatar) => async (dispatch) => {
    const token = localStorage.getItem('token');
    let response = await avatarAPI.saveUserAvatar(token, avatar);
    const { result, data } = response.data;
    if (result === 'ok' && data) {
        dispatch(setAvatar(data));
    }
}



export default authReducer;
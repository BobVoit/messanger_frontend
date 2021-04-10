import { authAPI, userAPI, avatarAPI } from '../api/api';
import { hashUserData } from '../common';
import { SETTINGS } from '../settings';

// constants
const SET_USER_DATA = 'SET_USER_DATA';
const SET_AUTH_ERROR = 'SET_AUTH_ERROR';
const SET_IS_SIGN_UP = 'SET_IS_SIGN_UP';
const SET_AVATAR = 'SET_AVATAR';
const SET_NICKNAME = 'SET_NICKNAME';
const SET_ABOUT_TEXT = 'SET_ABOUT_TEXT';
const SET_ERROR = 'SET_ERROR';
const CLEAR_ERROR = 'CLEAR_ERROR';


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
        case SET_NICKNAME: {
            return {
                ...state,
                nickname: action.nickname
            }
        }
        case SET_ABOUT_TEXT: {
            return {
                ...state,
                aboutText: action.aboutText
            }
        }
        case SET_ERROR: {
            return {
                ...state,
                error: action.error
            }
        }
        case CLEAR_ERROR: {
            return {
                ...state,
                error: null
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

export const setAvatar = (avatar) => {
    console.log(avatar);
    return {
    type: SET_AVATAR,
    avatar
}}

export const setNickname = (nickname) => ({
    type: SET_NICKNAME,
    nickname
})

export const setAboutText = (aboutText) => ({
    type: SET_ABOUT_TEXT,
    aboutText
})

export const setError = (error) => ({
    type: SET_ERROR,
    error
})

export const clearError = () => ({
    type: CLEAR_ERROR
})

// thunk

export const registration = (login, nickname, password) => async (dispatch) => {
    const { passHash, token, num } = hashUserData(login, password);
    let response = await authAPI.registration(login, nickname, passHash, token, num);
    const { result, data } = response.data;
    if (result === 'ok' && data) {
        localStorage.setItem('token', data);
        dispatch(getUserData(data));
        dispatch(clearError());
    } else if (result === 'ok' && !data) {
        dispatch(setError(SETTINGS.ERRORS[0].error));
    }
}

export const login = (login, password) => async (dispatch) => {
    const { passHash, token, num } = hashUserData(login, password);
    let response = await authAPI.login(login, passHash, token, num);
    const { result, data } = response.data;
    if (result === 'ok' && data) {
        localStorage.setItem('token', data);
        dispatch(getUserData(data));
        dispatch(clearError());
    } else if (result === 'ok' && !data) {
        dispatch(setError(SETTINGS.ERRORS[1].error));
    }
}

export const getUserData = (token) => async (dispatch) => {
    let response = await userAPI.getUserData(token);
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

export const updateNickname = (newNickname) => async (dispatch) => {
    const token = localStorage.getItem('token');
    let response = await userAPI.updateUserNickname(newNickname, token);
    const { result, data } = response.data;
    if (result === 'ok' && data) {
        dispatch(setNickname(data));
    }
}

export const updateAvatar = (avatar) => async (dispatch) => {
    const token = localStorage.getItem('token');
    let response = await avatarAPI.updateUserAvatar(token, avatar);
    const { result, data } = response.data;
    if (result === 'ok' && data) {
        dispatch(setAvatar(data));
    }
}

export const deleteAvatar  = () => async (dispatch) => {
    const token = localStorage.getItem('token');
    let response = await avatarAPI.deleteUserAvatar(token);
    const { result, data } = response.data;
    if (result === 'ok' && data) {
        dispatch(setAvatar(null));
    }
}

export const updateAboutText = (aboutText) => async(dispatch) => {
    const token = localStorage.getItem('token');
    let response = await userAPI.updateUserAboutText(token, aboutText);
    const { result, data } = response.data;
    if (result === 'ok' && (data || data === "")) {
        dispatch(setAboutText(data));
    }
}

export const getAboutText = () => async(dispatch) => {
    const token = localStorage.getItem('token');
    let response = await userAPI.getUserAboutText(token);
    const { result, data } = response.data;
    if (result === 'ok' && data) {
        dispatch(setAboutText(data));
    }
}


export default authReducer;
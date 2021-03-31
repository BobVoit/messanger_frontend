

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
    console.log(action);
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

export default authReducer;
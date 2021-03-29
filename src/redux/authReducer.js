

const SET_USER_DATA = 'SET_USER_DATA';
const SET_AUTH_ERROR = 'SET_AUTH_ERROR';

let initialState = {
    id: null,
    login: null,
    password: null,
    token: null,
    nickname: null,
    isAuth: false,
    status: null,
    error: null
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
            }
        }
        case SET_AUTH_ERROR: {
            return {
                ...state,
                error: action.error,
            }
        }
        default:
            return state;
    }
}

// action creators


export const setUserData = (id, login, password, nickname, isAuth, status) => ({
    type: SET_USER_DATA,
    id, login, password, nickname, isAuth, status
});

export const setAuthError = (error) => ({
    type: SET_AUTH_ERROR,
    error
})

export default authReducer;
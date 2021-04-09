export const SETTINGS = {
    PORT: 3001,
    WS_BASE: "ws://localhost:3001",

    // события сокетов
    MESSAGES: {
        LOGIN: 'LOGIN',
        REGISTRATION: 'REGISTRATION',
        LOGOUT: 'LOGOUT',
        GET_USER_DATA: 'GET_USER_DATA',
        SET_CONNECT: 'SET_CONNECT' 
    },

    ERRORS: [
        { id: 0, error: "Пользователь с таким логином уже существует" },
        { id: 1, error: "Логин или пароль введен неверно" },
    ]
}

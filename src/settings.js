export const SETTINGS = {
    PORT: 3001,
    WS_BASE: "ws://localhost:3001",

     // события сокетов
     MESSAGES: {
        GET_USER_DATA: 'GET_USER_DATA',
        SET_CONNECT: 'SET_CONNECT', 
        GET_ALL_ACTIVE_USERS: 'GET_ALL_ACTIVE_USERS',
        USER_CONNECT: 'USER_CONNECT',
        USER_DISCONNECT: 'USER_DISCONNECT',
        PRIVATE_MESSAGE: 'PRIVATE_MESSAGE',
        GET_ALL_MESSAGES: 'GET_ALL_MESSAGES',
        CREATE_ROOM: 'CREATE_ROOM',
        JOIN_IN_ROOM: 'JOIN_IN_ROOM',
        LEAVE_ROOM: 'LEAVE_ROOM',
        GET_ROOMS: 'GET_ROOMS',
        NEW_ROOM: 'NEW_ROOM',
    },

    ERRORS: [
        { id: 0, error: "Пользователь с таким логином уже существует" },
        { id: 1, error: "Логин или пароль введен неверно" },
    ]
}



// constants
const SET_ALL_MESSAGES = 'SET_ALL_MESSAGES';
const ADD_MESSAGE = 'ADD_MESSAGE';
const DELETE_MESSAGE = 'DELETE_MESSAGE';
const SET_COMPANION = 'SET_COMPANION';
const SET_ALL_ROOMS = 'SET_ALL_ROOMS';
const SET_NEW_ROOM = 'SET_NEW_ROOM';


// initialState
let initialState = {
    messages: [],
    currentCompanion: null,
    rooms: [],
}


// reducer

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_MESSAGES: {
            return {
                ...state,
                messages: action.messages
            }
        }
        case ADD_MESSAGE: {
            return {
                ...state,
                messages: [ ...state.messages, action.message ]
            }
        }
        case DELETE_MESSAGE: {
            return {
                ...state,
                messages: state.messages.filter(message => message.id !== action.message.id)
            }
        }
        case SET_COMPANION: {
            return {
                ...state,
                currentCompanion: action.companion
            }
        }
        case SET_ALL_ROOMS: {
            return {
                ...state,
                rooms: action.rooms
            }
        }
        case SET_NEW_ROOM: {
            return {
                ...state,
                rooms: [...state.rooms, action.room]
            }
        }
        default:
            return state;
    }
}


// action creators

export const setAllMessages = (messages) => ({
    type: SET_ALL_MESSAGES,
    messages
})

export const setCompanion = (companion) => ({ // id, idSelect, avatar, title, countUsers
    type: SET_COMPANION,
    companion
})

export const addMessage = (message) => ({
    type: ADD_MESSAGE,
    message
})

export const setAllRooms = (rooms) => ({
    type: SET_ALL_ROOMS,
    rooms
})

export const setNewRoom = (room) => ({
    type: SET_NEW_ROOM,
    room
})



export default chatReducer;
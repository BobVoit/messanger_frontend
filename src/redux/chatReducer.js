

// constants
const SET_ALL_MESSAGES = 'SET_ALL_MESSAGES';
const ADD_MESSAGE = 'ADD_MESSAGE';
const DELETE_MESSAGE = 'DELETE_MESSAGE';
const SET_COMPANION = 'SET_COMPANION';


// initialState
let initialState = {
    messages: [],
    currentCompanion: null,
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
        default:
            return state;
    }
}


// action creators

export const setAllMessages = (messages) => ({
    type: SET_ALL_MESSAGES,
    messages
})

export const setCompanion = (companion) => ({
    type: SET_COMPANION,
    companion
})



export default chatReducer;
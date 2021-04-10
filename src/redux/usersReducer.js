

const SET_ALL_ACTIVE_USERS = 'SET_ALL_ACTIVE_USERS';
const SET_NEW_ACTIVE_USER = 'SET_NEW_ACTIVE_USER';
const REMOVE_DISACTIVE_USER = 'REMOVE_DISACTIVE_USER';

// initialState
let initialState = {
    activeUsers: [],
}



const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_ACTIVE_USERS: {
            return {
                ...state,
                activeUsers: Object.values(action.activeUsers)
            }
        }
        case SET_NEW_ACTIVE_USER: {
            return {
                ...state,
                activeUsers: [ ...state.activeUsers, action.newActiveUser ]
            }
        }
        case REMOVE_DISACTIVE_USER: {
            return {
                ...state,
                activeUsers: state.activeUsers.filter(user => user.id !== action.user.id )
            }
        }
        default:
            return state;
    }
}

export const setAllActiveUsers = (users) => ({
    type: SET_ALL_ACTIVE_USERS,
    activeUsers: users
})

export const setNewActiveUser = (user) => ({
    type: SET_NEW_ACTIVE_USER,
    newActiveUser: user
})

export const removeDisactiveUser = (user) => ({
    type: REMOVE_DISACTIVE_USER,
    user
})



export default usersReducer;